const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 120,
  },
  position: {
    type: String,
    trim: true,
    required: true,
    maxlength: 120,
  },
}, { timestamps: true });

const Item = mongoose.model("Item", ItemSchema);

module.exports = { Item };