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

describe("Jobs API", () => {
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

  it("should allow an employer to create a job", async () => {
    const token = await registerAndLogin(
      "employer@example.com",
      "EMPLOYER"
    );

    const response = await request(app)
      .post("/api/jobs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Backend Developer",
        description:
          "We are looking for a junior backend developer.",
      });

    expect(response.status).toBe(201);
    expect(response.body.data.title).toBe(
      "Backend Developer"
    );
  });

  it("should prevent a seeker from creating a job", async () => {
    const token = await registerAndLogin(
      "seeker@example.com",
      "SEEKER"
    );

    const response = await request(app)
      .post("/api/jobs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Backend Developer",
        description:
          "We are looking for a junior backend developer.",
      });

    expect(response.status).toBe(403);
  });

  it("should return all jobs", async () => {
    const token = await registerAndLogin(
      "employer@example.com",
      "EMPLOYER"
    );

    await request(app)
      .post("/api/jobs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Node.js Developer",
        description:
          "We are looking for a Node.js developer.",
      });

    const response = await request(app)
      .get("/api/jobs");

    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
  });
});