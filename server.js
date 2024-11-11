"use strict"
const express = require('express');
const app = express();

const multer = require('multer');
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const pug = require('pug');
app.set('view engine', 'pug');
app.set('views', __dirname + '/app/index');

const jokesRoutes = require("./routes/jokes-router");
const { db_close } = require("./models/jokes-model");

app.use(express.static(__dirname + "/public"));
app.use("/jokebook", jokesRoutes);

app.get("/", function (req, res) {
  res.render("index");
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, function () {
  console.log("App listening at http://localhost:" + PORT);
});

process.on("SIGINT", cleanUp);
function cleanUp() {
  console.log("Terminate signal received.");
  db_close();
  console.log("Closing HTTP server...");
  server.close(() => {
    console.log("HTTP server closed.")
  })
}