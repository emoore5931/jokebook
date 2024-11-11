"use strict";
const path = require("path");
const Database = require("better-sqlite3");
const db = new Database(path.resolve(__dirname, "./db/JOKES.db"));

function Joke(setup, delivery, categoryID) {
    this.setup = setup;
    this.delivery = delivery;
    this.categoryId = categoryID;
}

function getCategories() {
    const sql = "SELECT * FROM Category;";
    const data = db.prepare(sql).all();
    return data;
}

function getJokesByCategory(categoryId) {
    const sql = "SELECT * FROM Jokes WHERE categoryId = ?";
    const data = db.prepare(sql).all([categoryId]);
    return data;
}

function getLimitedJokesByCategory(categoryId, limit) {
    const sql = `SELECT * FROM Jokes WHERE categoryId = ? LIMIT ?`;
    const data = db.prepare(sql).all([categoryId, limit]);
    return data;
}

function newJoke(joke) {
    console.log("Adding new joke to the database...");
    const sql = `INSERT INTO Jokes (setup, delivery, categoryID) VALUES (?, ?, ?);`;

    db.prepare(sql).run([joke.setup, joke.delivery, joke.categoryId]);
}

function getRandJoke() {
    const sql = "SELECT * FROM Jokes ORDER BY RANDOM() LIMIT 1;";
    const data = db.prepare(sql).get();
    return data;
}

function db_close() {
    console.log("Closing database...");
    db.close();
}

module.exports = {
    getCategories,
    getJokesByCategory,
    newJoke,
    Joke,
    db_close,
    getLimitedJokesByCategory,
    getRandJoke
}