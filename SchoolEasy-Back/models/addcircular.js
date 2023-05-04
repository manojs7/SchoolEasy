const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const circularSchema = new Schema({
  title: String,
  content: String,
  date: String,
});
module.exports = mongoose.model("circular", circularSchema);
