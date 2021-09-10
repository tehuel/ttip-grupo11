const request = require("supertest");

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("./index");

const Ingredient = require("../models/ingredient.model");

describe("/ingredient", () => {
  let mongoServer;
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const url = mongoServer.getUri();
    await mongoose.connect(url, { useNewUrlParser: true });
  });

  afterEach(async () => {
    // delete all collections
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany();
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it("GET /ingredient empty list", async () => {
    const res = await request(app).get("/ingredients");
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(0);
  });

  it("GET /ingredient with a single ingredient", async () => {
    // creates a single ingredient
    await Ingredient.create({
      name: "Test Ingredient",
    });
    const res = await request(app).get("/ingredients");
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(1);
  });
});
