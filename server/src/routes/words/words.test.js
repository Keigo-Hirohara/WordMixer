const request = require("supertest");
const app = require("../../app");
const { connectMongo, disconnectMongo } = require("../../services/mongo");

describe("Words API", () => {
  beforeAll(async () => {
    await connectMongo();
  });

  afterAll(async () => {
    await disconnectMongo();
  });

  describe("Test GET /word", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/v1/word")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /word", () => {
    const completeWordData = {
      word: "テスト用単語",
    };

    test("It should respond with 201 success", async () => {
      const response = await request(app)
        .post("/v1/word")
        .send(completeWordData)
        .expect("Content-Type", /json/)
        .expect(201);

      expect(response.body).toStrictEqual(completeWordData);
    });

    test("It should catch Missing required properties", async () => {
        const response = await request(app)
            .post('/v1/word')
            .send({})
            .expect('Content-type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: "Missing required launch property"
        })
    });
  });
});
