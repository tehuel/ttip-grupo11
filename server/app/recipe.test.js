const request = require("supertest");

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("./index");

const Recipe = require("../models/recipe.model");

describe("/recipe", () => {
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

  it("GET /recipes empty list", async () => {
    const res = await request(app).get("/recipes");
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(0);
  });

  it("GET /recipes with a single recipe", async () => {
    // creates a single recipe
    await Recipe.create({
      name: "Test Recipe",
    });
    const res = await request(app).get("/recipes");
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(1);
  });

  it("GET /recipes with multiple recipes", async () => {
    // creates a single recipe
    await Recipe.create({
      name: "Test Recipe",
    });
    await Recipe.create({
      name: "Another test recipe",
    });
    const res = await request(app).get("/recipes");
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(2);
  });

  it("POST /recipes to create recipe", async () => {
    // creates a single recipe
    const newRecipeData = {
      name: "Test Recipe",
    };
    const res = await request(app).post("/recipes").send(newRecipeData);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Created");
    expect(res.body.data.name).toBe("Test Recipe");
  });

  it("PUT /recipes/:recipe to modify recipe", async () => {
    // creates a single recipe
    await Recipe.create({
      name: "test",
    });
    const newRecipeData = {
      name: "Updated Name",
    };
    const res = await request(app).put("/recipes/test").send(newRecipeData);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Receta modificada.");
    expect(res.body.data.name).toBe("Updated Name");
  });

  it("DELETE /recipes/:recipe to delete recipe", async () => {
    // creates a single recipe
    await Recipe.create({
      name: "test",
    });
    const res = await request(app).delete("/recipes/test");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Receta eliminada.");
  });
});