const express = require("express");
const jiraController = require("../controllers/jira.controller");

const router = express.Router();

router.get("/", jiraController.getJira);

module.exports = router;
