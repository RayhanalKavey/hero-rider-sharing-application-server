const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

module.exports = (userCollection) => {
  /** JS Docker
   * @api {get}
   * @apiDescription Get all users
   * @apiSuccess {Object[]} all the users
   */
  router.get("/", async (req, res) => {
    let query = {};
    const users = await userCollection.find(query).toArray();
    res.send(users);
  });
  router.get("/info", async (req, res) => {
    let query = {};
    // Copy query object
    const filters = { ...req.query };
    // Excluded property
    const excludedField = ["sort", "page", "limit"];
    excludedField.forEach((field) => delete filters[field]);
    // console.log("original object", req.query);
    // console.log("filters", filters);

    // Sorting
    if (req.query.sort) {
      const naturalQuery = { $natural: -1 };
      const sortBy = req.query.sort.split(",").join(" ");
      query.sortBy = sortBy;

      // console.log("sort by", query.sortBy);
    }

    // Which fields will return
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query.fields = fields;
      console.log(fields);
    }
    // Find users
    const users = await userCollection
      .find({})
      .sort(query.sortBy)
      .select("fullName")
      .toArray();
    // .sort({ $natural: -1 })
    // console.log(users);
    res.send(users);
  });

  router.post("/", async (req, res) => {
    const user = req.body;
    // console.log("Received post employer", user);
    const result = await userCollection.insertOne(user);
    res.send(result);
  });
  return router;
};
