"use strict";
const path = require("path");
const Database = require("better-sqlite3");
const db = new Database(path.resolve(__dirname, "./db/JOKES.db"));

function Joke(setup, delivery, categoryID) {
    this.setup = setup;
    this.delivery = delivery;
    this.categoryID = categoryID;
}

function getCategories() {
    const sql = "SELECT * FROM Category;";
    const data = db.prepare(sql).all();
    return data;
}

function getJokesByCategory(categoryId) {
    const sql = `SELECT * FROM Jokes WHERE categoryId = ${categoryId}`;
    const data = db.prepare(sql).all();
    return data;
}

function getJokesByCategory(categoryId, limit) {
    //todo
}

function newJoke(joke) {
    const sql =  `INSERT INTO Jokes (setup, delivery, categoryID) VALUES (${joke.setup}, ${joke.delivery}, ${joke.categoryId})`;
    db.exec(sql);
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
    db_close
}