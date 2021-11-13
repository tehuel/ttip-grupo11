const request = require("supertest");
const app = require("./index");

const Recipe = require("../models/recipe.model");
const Ingredient = require("../models/ingredient.model");
const Tag = require("../models/tag.model");

describe("/recipe/search", () => {
  it("POST /recipes/search with single ingredient", async () => {
    // creates a single recipe
    const createdIngredient = await Ingredient.create({
      name: "Test Ingredient",
    });
    const createdIngredientEntry = {
      ingredient: createdIngredient,
      quantity: "1 unidad",
    };
    const createdRecipe = await Recipe.create({
      name: "Test Recipe",
      ingredients: [createdIngredientEntry],
    });

    // search recipe
    const res = await request(app)
      .post(`/recipes/search`)
      .send({
        ingredients: [createdIngredient._id],
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

  it("POST /recipes/search with name", async () => {
    // creates a single recipe
    const createdRecipe = await Recipe.create({
      name: "Test Recipe",
    });

    // search recipe
    const res = await request(app).post(`/recipes/search`).send({
      name: "Test Recipe",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].name).toBe(createdRecipe.name);
  });

  it("POST /recipes/search empty", async () => {
    // find recipe
    const res = await request(app).post(`/recipes/search`).send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toHaveLength(1);
  });

  it("POST /recipes/search with non allowed criteria", async () => {
    // find recipe
    const res = await request(app).post(`/recipes/search`).send({
      invented: true,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toHaveLength(1);
  });
});
