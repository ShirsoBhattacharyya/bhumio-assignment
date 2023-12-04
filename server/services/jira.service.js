const axios = require("axios");
const constants = require("../constants/jira.constant");

const getJiraResponse = async (token, email, assigned = false) => {
  try {
    const jqlQuery = assigned
      ? "assignee is not EMPTY AND resolution=Unresolved"
      : "assignee is EMPTY AND resolution=Unresolved";
    const response = await axios.get(
      `${constants.JIRA_BASE_URL}/rest/api/3/search`,
      {
        params: {
          jql: jqlQuery,
        },
        headers: {
          Authorization: `Basic ${Buffer.from(`${email}:${token}`).toString(
            "base64"
          )}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error in getJiraResponse:", error.message);
    throw error;
  }
};

module.exports = {
  getJiraResponse,
};
