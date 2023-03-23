const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConnect = require("./utils/dbConnect");
const userRoutes = require("./routes/v1/user.route");

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
      /* ----User Collection and User API call---- */
      const userCollection = client.db("heroRider").collection("user");
      app.use("/api/v1/user", userRoutes(userCollection));

      // testing server
      app.get("/", (req, res) => {
        res.send("Welcome to the Hero Rider server.");
      });
      app.get("/", (req, res) => {
        res.send(
          "Welcome to the Hero Rider server. base starting route= http....../api/v1"
        );
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
