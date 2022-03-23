/**
 * @jest-environment jsdom
 */
const request = require("supertest");
const app = require("../app");

const usersTest = () => {
  describe("Test POST /login", () => {
    const completeUserData = {
      username: "keigo",
      password: "158281872keigo",
    };
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .post("/v1/login")
        .send(completeUserData)
        .expect("Content-Type", /json/)
        .expect(200);
      localStorage.setItem("token", response._body.token);
      console.log(response);
    });
  });
};

module.exports = usersTest;
