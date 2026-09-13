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
//API AUTH
describe("Auth API", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
//=================REGISTER===========================

  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "1234567890",
        role: "SEEKER",
      });

    expect(response.status).toBe(201);

    expect(response.body.data.email).toBe(
      "test@example.com"
    );

    expect(response.body.data.password).toBeUndefined();
  });
//======================LOGIN==========================================
it("should login a registered user", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Test User",
      email: "test@example.com",
      password: "1234567890",
      role: "SEEKER",
    });

  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "test@example.com",
      password: "1234567890",
    });

  expect(response.status).toBe(200);
  expect(response.body.data.token).toBeDefined();
  expect(response.body.data.user.email).toBe("test@example.com");
});
//===================PROTECTED ROUTE==============================
it("should access /me with a valid token", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "Test User",
      email: "test@example.com",
      password: "1234567890",
      role: "SEEKER",
    });

  const loginResponse = await request(app)
    .post("/api/auth/login")
    .send({
      email: "test@example.com",
      password: "1234567890",
    });

  const token = loginResponse.body.data.token;

  const response = await request(app)
    .get("/api/auth/me")
    .set("Authorization", `Bearer ${token}`);

  expect(response.status).toBe(200);
  expect(response.body.data.email).toBe("test@example.com");
});
});
