const dotenv = require("dotenv");
dotenv.config();

const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_EMAIL_ID = "shirso369@gmail.com";
const JIRA_BASE_URL = "https://shirso369.atlassian.net";

module.exports = { JIRA_API_TOKEN, JIRA_EMAIL_ID, JIRA_BASE_URL };
