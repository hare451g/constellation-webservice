const express = require("express");
const router = express.Router();
const checkToken = require("../../middlewares/checkToken");

// import todo services from services
const { getAll, createNewTransaction } = require("./functions");

// public routes
router.get("/", checkToken, getAll);
router.post("/", checkToken, createNewTransaction);

module.exports = router;
