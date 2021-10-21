const request = require("supertest");

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("./index");

const Recipe = require("../models/recipe.model");
const Ingredient = require("../models/ingredient.model");
const Tag = require("../models/tag.model");

describe("/recipe/search", () => {
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

  it("POST /recipes/search with ingredient", async () => {
    // creates a single recipe
    const createdIngredient = await Ingredient.create({
      name: "Test Ingredient",
    });
    const ingredientsList = [createdIngredient._id];
    const createdRecipe = await Recipe.create({
      name: "Test Recipe",
      ingredients: ingredientsList,
    });

    // search recipe
    const res = await request(app).post(`/recipes/search`).send({
      ingredients: ingredientsList,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].name).toBe(createdRecipe.name);
  });

  it("POST /recipes/search with tag", async () => {
    // creates a single recipe
    const createdTag = await Tag.create({
      name: "Test Tag",
    });
    const tagsList = [createdTag._id];
    const createdRecipe = await Recipe.create({
      name: "Test Recipe",
      tags: tagsList,
    });

    // search recipe
    const res = await request(app).post(`/recipes/search`).send({
      tags: tagsList,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].name).toBe(createdRecipe.name);
  });

  it("POST /recipes/search empty", async () => {
    // find recipe
    const res = await request(app).post(`/recipes/search`).send({});
    console.log(res.body);
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toHaveLength(1);
  });

  it("POST /recipes/search with non allowed criteria", async () => {
    // find recipe
    const res = await request(app).post(`/recipes/search`).send({
      invented: true,
    });
    console.log(res.body);
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toHaveLength(1);
  });
});
