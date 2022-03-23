/**
 * @jest-environment jsdom
 */

const {TextEncoder, TextDecoder} = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { connectMongo, disconnectMongo } = require("./services/mongo");

const ideasTest = require("./tests/ideas.test");
const usersTest = require("./tests/users.test");
const wordsTest = require("./tests/words.test");

jest.setTimeout(14000);

describe("Test server API", () => {

  beforeAll(async () => {
    await connectMongo();
  });

  afterAll(async () => {
    await disconnectMongo();
  });

  describe("Test Users API", usersTest);

  describe("Test Words API", wordsTest);

  describe("Test Ideas API", ideasTest);
});
