const express = require('express');
const mongoose = require("mongoose");
const multer = require('multer');
const {nanoid} = require('nanoid');
const config = require('../config');
const User = require("../models/User");
const path = require("path");
const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        const users = await User.find();
        return res.send(users);
    } catch (error) {
        next(error);
    }
});


router.post('/', async (req, res, next) => {
    try {
        const userData = {
            email: req.body.email,
            password: req.body.password,
            displayName: req.body.displayName,
            phoneNumber: req.body.phoneNumber,
        }

        const user = new User(userData);

        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }
});

router.post('/sessions', async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) return res.status(400).send({error: 'Email not found'});

        const isMatch = await user.checkPassword(req.body.password);
        if (!isMatch) return res.status(400).send({error: 'Password is wrong'});

        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (e) {
        next(e);
    }
});


router.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const message = {message: 'OK'};

        if (!token) return res.send(message);
        const user = await User.findOne({token});

        if (!user) return res.send(message);

        user.generateToken();
        await user.save();

        return res.send(message);
    } catch (e) {
        next(e);
    }
});

module.exports = router;