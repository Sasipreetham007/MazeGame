const express = require("express");
const app = express();
const path = require("path");
// use the express-static middleware
//Code by Me
// define the first route

app.use("/static", express.static("./static/"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "Index.html"));
});

app.get("/Initial.html", function (req, res) {
  res.sendFile(path.join(__dirname, "Initial.html"));
});

app.get("/Maze.html", function (req, res) {
  res.sendFile(path.join(__dirname, "Maze.html"));
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
