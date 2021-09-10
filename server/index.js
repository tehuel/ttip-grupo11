const mongoose = require("mongoose");
const config = require("./config.js");
const app = require("./app");

mongoose.connect(
  config.MONGO_URL,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("Successfully Established Connection with MongoDB");
    } else {
      console.log(
        "Failed to Establish Connection with MongoDB with Error: " + err
      );
    }
  }
);

app.listen(config.PORT, config.HOST, function () {
  console.log(`App listening on http://${config.HOST}:${config.PORT}`);
});
