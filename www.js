require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
// const history = require("connect-history-api-fallback");

const PORT = process.env.PORT || 8888;

const app = express();

app.use(express.static(path.resolve(__dirname, "./client/build")));

app
  .use(express.static(path.resolve(__dirname, "./client/build")))
  .use(cors())
  .use(cookieParser())
  .use(express.static(path.resolve(__dirname, "./client/build")));

app.get("/", function(req, res) {
  res.render(path.resolve(__dirname, "./client/build/index.html"));
});

app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "./client/public", "index.html"));
});

app.listen(PORT, function() {
  console.warn(`listening on port ${PORT}`);
});
