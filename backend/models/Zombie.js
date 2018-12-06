const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ZombieSchema = new Schema({
  name: String,
  gender: String,
  location: String
});

// const ZombieSchema = new Schema({
//   name: String,
//   url: String,
//   technique: String
// });

module.exports = mongoose.model("Zombie", ZombieSchema);
