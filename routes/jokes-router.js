"use strict";
const express = require("express");
const router = express.Router();

const jokesController = require("../controllers/jokes-controller");

router.get("/categories", jokesController.getCategories);

router.get("/joke/:category/:limit?", jokesController.getJokesByCategory);

router.post("/joke/new", jokesController.postNewJoke);

module.exports = router;