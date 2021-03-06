const request = require("supertest");
const app = require("./index");

const Ingredient = require("../models/ingredient.model");

describe("/ingredient", () => {
  it("GET /ingredients empty list", async () => {
    const res = await request(app).get("/ingredients");
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(0);
  });

  it("GET /ingredients with a single ingredient", async () => {
    // creates a single ingredient
    await Ingredient.create({
      name: "Test Ingredient",
    });

    const res = await request(app).get("/ingredients");
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(1);
  });

  it("GET /ingredients with multiple ingredients", async () => {
    // creates a single ingredient
    await Ingredient.create({
      name: "Test Ingredient",
    });
    await Ingredient.create({
      name: "Another test ingredient",
    });
    const res = await request(app).get("/ingredients");
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(2);
  });

  it("POST /ingredients to create ingredient", async () => {
    // creates a single ingredient
    const newIngredientData = {
      name: "Test Ingredient",
    };
    const res = await request(app).post("/ingredients").send(newIngredientData);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Created");
    expect(res.body.data.name).toBe("Test Ingredient");
  });

  it("POST /ingredients error on empty ingredient", async () => {
    // creates a single ingredient
    const emptyIngredientData = {};
    const res = await request(app)
      .post("/ingredients")
      .send(emptyIngredientData);
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toHaveLength(1);
  });

  it("POST /ingredients error repeated ingredient", async () => {
    // creates a single ingredient
    const newIngredientData = {
      name: "Test Ingredient",
    };
    const res1 = await request(app)
      .post("/ingredients")
      .send(newIngredientData);
    expect(res1.statusCode).toBe(201);

    const res2 = await request(app)
      .post("/ingredients")
      .send(newIngredientData);
    expect(res2.statusCode).toBe(400);
  });

  it("PUT /ingredients/:ingredient to modify ingredient", async () => {
    // creates a single ingredient
    await Ingredient.create({
      name: "test",
    });
    const newIngredientData = {
      name: "Updated Name",
    };
    const res = await request(app)
      .put("/ingredients/test")
      .send(newIngredientData);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Ingrediente modificado");
    expect(res.body.data.name).toBe("Updated Name");
  });

  it("DELETE /ingredients/:ingredient to delete ingredient", async () => {
    // creates a single ingredient
    await Ingredient.create({
      name: "test",
    });
    const res = await request(app).delete("/ingredients/test");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Ingrediente eliminado");
  });
});
