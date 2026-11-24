import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";

const mocks = vi.hoisted(() => ({
  getAllDoctors: vi.fn(),
}));

vi.mock("../src/services/doctor.service", () => ({
  getAllDoctors: mocks.getAllDoctors,
}));

const JWT_SECRET = "clinigo-test-secret";

let app: (typeof import("../src/app"))["default"];

beforeAll(async () => {
  process.env.JWT_SECRET = JWT_SECRET;

  const module = await import("../src/app");
  app = module.default;
});

beforeEach(() => {
  vi.clearAllMocks();
});

const generateToken = () =>
  jwt.sign(
    { userId: 1, role: "ADMIN" },
    JWT_SECRET,
  );

describe("GET /api/doctors", () => {
  it("should return all doctors with a valid JWT", async () => {
    const doctors = [
      { id: 1, name: "Dr. Sharma" },
      { id: 2, name: "Dr. Khan" },
    ];

    mocks.getAllDoctors.mockResolvedValue(doctors);

    const token = generateToken();

    const response = await request(app)
      .get("/api/doctors")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      status: true,
      data: doctors,
    });

    expect(mocks.getAllDoctors).toHaveBeenCalledTimes(1);
  });

  it("should return 401 when JWT is missing", async () => {
    const response = await request(app)
      .get("/api/doctors");

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      status: false,
      message: "Authentication token required",
    });

    expect(mocks.getAllDoctors).not.toHaveBeenCalled();
  });

  it("should return 401 when JWT is invalid", async () => {
    const response = await request(app)
      .get("/api/doctors")
      .set("Authorization", "Bearer invalid-token");

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      status: false,
      message: "Invalid or expired token",
    });

    expect(mocks.getAllDoctors).not.toHaveBeenCalled();
  });

  it("should return 500 when doctor retrieval fails", async () => {
    mocks.getAllDoctors.mockRejectedValue(
      new Error("Database connection failed"),
    );

    const token = generateToken();

    const response = await request(app)
      .get("/api/doctors")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(500);

    expect(response.body).toEqual({
      status: false,
      message: "Internal server error",
    });
  });
});