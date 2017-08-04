const app = require("../../index.js");
const request = require("supertest");

describe("Homepage router", () => {
  describe("GET /", () => {
    it("will return a status code of 200", () => {
      request(app)
      .get("/")
      .expect(200)
      .expect((req) => {
        req.text.includes("This page was rendered")
      });
    });
  });
});
