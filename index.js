const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("colors");

const app = express();
const port = process.env.PORT || 5003;

//Middleware
app.use(cors());
app.use(express.json());

/*=========================
 //Connect to the database
  =========================  */

app.get("/", (req, res) => {
  res.send("Welcome to the Hero Rider server.");
});
app.listen(port, () => {
  console.log(`Hero Rider server in running on port: ${port}`.rainbow.bgWhite);
});
