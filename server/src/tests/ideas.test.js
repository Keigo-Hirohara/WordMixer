/**
 * @jest-environment jsdom
 */
const request = require("supertest");
const app = require("../app");

const ideasTest = () => {
  describe("Test GET /idea", () => {
    test("It should response with 200 success", async () => {
      const response = await request(app)
        .get("/v1/idea")
        .set('x-access-token', localStorage.getItem("token"))
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /idea", () => {
    const completeIdeaData = {
      idea: "テスト + アイデア",
      desc: "詳細味入力（テスト）",
    };
    test("It should response with 201 success", async () => {
      const response = await request(app)
        .post("/v1/idea")
        .set('x-access-token', localStorage.getItem("token"))
        .send(completeIdeaData)
        .expect("Content-Type", /json/)
        .expect(201);
      expect(response.body).toStrictEqual(completeIdeaData);
    });

    test("It should catch Missing required properties", async () => {
      const response = await request(app)
        .post("/v1/idea")
        .set('x-access-token', localStorage.getItem("token"))
        .send({})
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "new idea is not defined!!",
      });
    });
  });
};

module.exports = ideasTest;
