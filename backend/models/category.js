const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  _id: string,
  name: {
    type: string,
    required: true,
    unique: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category
