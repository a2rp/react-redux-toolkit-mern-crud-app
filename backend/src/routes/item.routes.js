const express = require("express");
const mongoose = require("mongoose");
const { Item } = require("../models/item.model");

const router = express.Router();

function getItemData(body = {}) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const position = typeof body.position === "string" ? body.position.trim() : "";

  if (!name || !position || name.length > 120 || position.length > 120) {
    return null;
  }
  return { name, position };
}

function handleRouteError(res, error, action) {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ response: "Please provide valid employee details." });
  }
  console.error(error);
  return res.status(500).json({ response: `Unable to ${action} employee.` });
}

router.get("/items", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    return res.status(200).json({ response: items });
  } catch (error) {
    return handleRouteError(res, error, "load");
  }
});

router.post("/items", async (req, res) => {
  const data = getItemData(req.body);
  if (!data) {
    return res.status(400).json({ response: "Name and position are required (up to 120 characters each)." });
  }

  try {
    const item = await Item.create(data);
    return res.status(201).json({ response: item });
  } catch (error) {
    return handleRouteError(res, error, "create");
  }
});

router.put("/items/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ response: "Please provide a valid employee ID." });
  }

  const data = getItemData(req.body);
  if (!data) {
    return res.status(400).json({ response: "Name and position are required (up to 120 characters each)." });
  }

  try {
    const item = await Item.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ response: "Employee not found." });
    }
    return res.status(200).json({ response: item });
  } catch (error) {
    return handleRouteError(res, error, "update");
  }
});

router.delete("/items/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ response: "Please provide a valid employee ID." });
  }

  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ response: "Employee not found." });
    }
    return res.status(200).json({ response: req.params.id });
  } catch (error) {
    return handleRouteError(res, error, "delete");
  }
});

module.exports = router;