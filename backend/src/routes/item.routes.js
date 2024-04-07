const express = require("express");
const router = express.Router();
const { Item } = require("../models/item.model");

router.get("/items", async (req, res) => {
    try {
        await Item.find().then((response) => {
            res.status(200).send({ response: response });
        }).catch((err) => {
            res.status(500).send({ response: err.message });
        });
    } catch (err) {
        res.status(500).send({ response: err.message });
    }
});

router.post("/items", async (req, res) => {
    try {
        const newItem = new Item({
            name: req.body.name,
            position: req.body.position,
        });
        await newItem.save().then((response) => {
            res.status(200).send({ response: response });
        }).catch((err) => {
            res.status(500).send({ response: err.message });
        });
    } catch (err) {
        res.status(500).send({ response: err.message });
    }
});

router.put("/items/:id", async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).send({ response: updatedItem });
    } catch (err) {
        res.status(500).send({ response: err.message });
    }
});

router.delete("/items/:id", async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id).then((response) => {
            res.status(200).send({ response: req.params.id });
        });
    } catch (err) {
        res.status(500).send({ response: err.message });
    }
});

module.exports = router;
