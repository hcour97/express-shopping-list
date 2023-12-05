const express = require("express")
const router = express.Router()
const Item = require("../item")

router.get("/items", (req,res,next) => {
    try {
        return res.json({ items: Item.findAll() });
    } catch(err) {
        return next(err)
    }
})

router.post("/items", (req,res,next) => {
    try {
        let newItem = new Item(req.body.name, req.body.price);
        return res.json({item: newItem});
    } catch (err) {
        return next(err)
    }
});

router.get("/items/:name", (req, res, next) => {
    try {
        let foundItem = new Item(req.params.name);
        return res.json({item:foundItem});
    } catch (err) {
        return next(err)
    }
});

router.patch("/items/:name", (req, res, next) => {
    try {
        let foundItem = Item.update(req.params.name, req.body);
        return res.json({item: foundItem });
    } catch (err) {
        return next(err)
    }
});