const express = require("express");
const jiraRoutes = require('./jira.route');

const router = express.Router();

router.use("/jira", jiraRoutes);

module.exports = router;