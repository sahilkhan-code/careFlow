import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app";

describe("Health API", () => {
    it("should return application health status", async () => {
        const response = await request(app).get("/api/health");

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            status: "ok",
        });
    });

    it("should return json response", async () => {
        const response = await request(app).get("/api/health");

        expect(response.header["content-type"]).toContain("application/json");
    })

});