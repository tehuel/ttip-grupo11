const faker = require("faker/locale/es");

const ingredients = [
  "Aceite de soja",
  "Aceite de maíz",
  "Aceite de oliva",
  "Aceite de trufa",
  "Yogur",
  "Leche",
  "Helado",
  "Queso",
  "Manteca",
  "Miel",
  "Ajo",
  "Papa",
  "Lechugas",
  "Acelga",
  "Alcaparra",
  "Batata",
  "Berenjena",
  "Puerro",
  "Brócoli",
  "Calabacín",
  "Calabaza",
  "Cebolla",
  "Cebolla caramelizada",
  "Ciboulette",
  "Coles de Bruselas",
  "Coliflor",
  "Endivia",
  "Tomate",
  "Zanahoria",
  "Escarola",
  "Espárrago",
  "Espinaca",
  "Hinojo",
  "Judías",
  "Maíz",
  "Palmito",
  "Pepino",
  "Pimiento",
  "Puerro",
  "Remolacha",
  "Zapallo",
];

const fakeIngredient = () => {
  const ingredient = faker.random.arrayElement(ingredients);
  const color = faker.commerce.color();
  const word = faker.lorem.word();
  return {
    name: `${ingredient} ${color} ${word}`,
  };
};

module.exports = fakeIngredient;
