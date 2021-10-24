const request = require("supertest");
const app = require("./index");

const Recipe = require("../models/recipe.model");
const RecipeSeeder = require("../database/recipe.seeder");

describe("/recipe", () => {
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
    // create 2 recipes
    await RecipeSeeder([], [], 2);

    const res = await request(app).get("/recipes");
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(2);
  });

  it("GET /recipes with pagination", async () => {
    // creates fake recipes
    await RecipeSeeder([], [], 6);

    const res = await request(app).get("/recipes").query({ skip: 5 });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(1);
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

  it("GET /recipes/:id with a existent recipe", async () => {
    // creates a single recipe
    const createdRecipe = await Recipe.create({
      name: "Test Recipe",
    });
    const { _id: recipeId, name: recipeName } = createdRecipe;

    // find recipe
    const res = await request(app).get(`/recipes/${recipeId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe(recipeName);
  });

  it("GET /recipes/:id with a non existent recipe", async () => {
    // non existent recipe ID
    const recipeId = 1;

    // find recipe
    const res = await request(app).get(`/recipes/${recipeId}`);
    expect(res.statusCode).toBe(400);
    // expect(res.body.data.name).toBe(recipeName);
  });
});
