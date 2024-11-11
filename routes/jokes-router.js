"use strict";
const express = require("express");
const router = express.Router();

const jokesController = require("../controllers/jokes-controller");

router.get("/categories", jokesController.getCategories);

router.get("/joke", jokesController.getJokesByCategory);

router.post("/joke/new", jokesController.postNewJoke);

router.get("/joke/random", jokesController.getRandJoke);

module.exports = router;