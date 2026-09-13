import request from "supertest";
import {
  describe,
  it,
  expect,
  beforeEach,
  afterAll,
} from "vitest";

import app from "../app.js";
import prisma from "../config/prisma.js";

describe("Applications API", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  async function registerAndLogin(
    email: string,
    role: "SEEKER" | "EMPLOYER"
  ) {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email,
        password: "1234567890",
        role,
      });

    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({
        email,
        password: "1234567890",
      });

    return loginResponse.body.data.token;
  }

  it("should allow a seeker to apply to a job", async () => {
    const employerToken = await registerAndLogin(
      "employer@example.com",
      "EMPLOYER"
    );

    const jobResponse = await request(app)
      .post("/api/jobs")
      .set("Authorization", `Bearer ${employerToken}`)
      .send({
        title: "Backend Developer",
        description:
          "We are looking for a junior backend developer.",
      });

    const jobId = jobResponse.body.data.id;

    const seekerToken = await registerAndLogin(
      "seeker@example.com",
      "SEEKER"
    );

    const response = await request(app)
      .post(`/api/jobs/${jobId}/apply`)
      .set("Authorization", `Bearer ${seekerToken}`);

    expect(response.status).toBe(201);
    expect(response.body.data.status).toBe("PENDING");
    expect(response.body.data.jobId).toBe(jobId);
  });

  it("should prevent duplicate applications", async () => {
    const employerToken = await registerAndLogin(
      "employer@example.com",
      "EMPLOYER"
    );

    const jobResponse = await request(app)
      .post("/api/jobs")
      .set("Authorization", `Bearer ${employerToken}`)
      .send({
        title: "Backend Developer",
        description:
          "We are looking for a junior backend developer.",
      });

    const jobId = jobResponse.body.data.id;

    const seekerToken = await registerAndLogin(
      "seeker@example.com",
      "SEEKER"
    );

    await request(app)
      .post(`/api/jobs/${jobId}/apply`)
      .set("Authorization", `Bearer ${seekerToken}`);

    const secondResponse = await request(app)
      .post(`/api/jobs/${jobId}/apply`)
      .set("Authorization", `Bearer ${seekerToken}`);

    expect(secondResponse.status).toBe(409);
  });
});