const express = require("express");
const router = express.Router();
const {postContact , getContact} = require("../controllers/contactController");

router.get("/contacts/:username", getContact);

router.post("/contacts", postContact);

module.exports = router;
