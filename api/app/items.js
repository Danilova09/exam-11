const express = require('express');
const mongoose = require("mongoose");
const multer = require('multer');
const {nanoid} = require('nanoid');
const config = require('../config');
const Item = require("../models/Item");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try {
        if (req.query.category) {
            const items = await Item.find({category: req.query.category}).populate('user', '_id email displayName phoneNumber').populate('category');
            return res.send(items);
        }
        const items = await Item.find().populate('user', '_id email displayName phoneNumber').populate('category');
        return res.send(items);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        if( !mongoose.Types.ObjectId.isValid(req.params.id)) return false;

        const item = await Item.findById(req.params.id).populate('user', '_id email displayName phoneNumber').populate('category');
        return res.send(item);
    } catch (error) {
        next(error);
    }
});

router.post('/', upload.single('image'), async (req, res, next) => {
    try {
        if (!req.file) {
           return res.status(400).send({error: 'Image is required'});
        }

        const itemData = {
            user: req.body.user,
            category: req.body.category,
            title: req.body.title,
            description: req.body.description,
            price: parseInt(req.body.price),
            image: req.file.filename,
        }

        const item = new Item(itemData);

        await item.save();
        return res.send(item);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        console.log(req.params.id);
        await Item.findById(req.params.id).deleteOne();
        return res.send({mesage: 'deleted'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;