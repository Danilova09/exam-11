const express = require('express');
const Category = require("../models/Category");
const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        const categories = await Category.find();
        return res.send(categories);
    } catch (error) {
        next(error);
    }
});

module.exports = router;