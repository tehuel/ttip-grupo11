const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const url = mongoServer.getUri();
  await mongoose.connect(url, {
    useNewUrlParser: true,
  });
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
