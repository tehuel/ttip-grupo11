const mongoose = require("mongoose");
const config = require("../config.js");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);

mongoose.connect(config.MONGO_URL, (err) => {
  if (!err) {
    console.log("Successfully Established Connection with MongoDB");
  } else {
    console.log(
      "Failed to Establish Connection with MongoDB with Error: " + err
    );
  }
});
module.exports = mongoose;
