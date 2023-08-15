const http = require("http");
const port = 3000;
const path = require("path");
const express = require("express");
const cors = require("cors");
const { table } = require("console");
const { Client } = require("pg");
const { urlencoded, query } = require("express");
var bodyParser = require("body-parser");
const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "admin",
  database: "price_history_db",
});

const app = express();
app.use(cors());
app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/insert_que", cors(), (req, res) => {
  console.log(req.query);
  pool.query(req.query.q, (error, results) => {
    if (error) {
      res.status(400).json("Wrong Query");
    } else res.status(200).json(results.rows);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
