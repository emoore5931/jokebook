"use strict";
const model = require("../models/jokes-model");

function getCategories(req, res, next) {
    try {
        res.json(model.getCategories());
    } catch (err) {
        console.error("Error fetching categories: ", err.message);
        next(err);
    }
}

function getJokesByCategory(req, res, next) {
    const category = req.query.category;
    const limit = req.query.limit;
    if (category) {
        if (limit && limit > 0) {
            try {
                res.json(model.getJokesByCategory(category, limit));
            } catch (err) {
                console.error("Error while getting jokes by category with the set limit: ", err.message);
                next(err);
            }
        } else {
            try {
                res.json(model.getJokesByCategory(category));
            } catch (err) {
                console.error("Error while getting jokes by category: ", err.message);
                next(err);
            }
        }
    } else {
        res.status(400).send("Invalid Request");
    }
}

function postNewJoke(req, res, next) {
    const setup = req.body.setup;
    const delivery = req.body.delivery;
    const categoryId = req.body.categoryId;

    if (delivery && categoryId) {
        try {
            model.newJoke(new model.Joke(setup, delivery, categoryId));
            res.status(200).send("Joke Creation Successful");
        } catch (error) {
            console.error("Error while creating new joke: ", error.message);
            next(err);
        }
    } else {
        res.status(400).send("Invalid Request");
    }
}

module.exports = {
    getCategories,
    getJokesByCategory,
    postNewJoke
}