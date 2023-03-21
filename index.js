const express = require("express");
const cors = require("cors");
const dbConnect = require("./utils/dbConnect");

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
dbConnect()
  .then((client) => {
    try {
      // testing server
      app.get("/", (req, res) => {
        res.send("Welcome to the Hero Rider server.");
      });
    } finally {
    }
    // Start the server once connected to the database
    app.listen(port, () => {
      console.log(
        `Hero Rider server in running on port: ${port}`.rainbow.bgWhite
      );
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error);
  });
