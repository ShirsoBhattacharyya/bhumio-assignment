const axios = require("axios");
const constants = require("../constants/jira.constant");

const getJiraResponse = async (token, email, assigned = false) => {
  let response;
  try {
    if (assigned) {
      response = await axios.get(
        `${constants.JIRA_BASE_URL}/rest/api/3/search`,
        {
          params: {
            jql: "assignee is not EMPTY AND resolution=Unresolved",
          },
          headers: {
            Authorization: `Basic ${Buffer.from(`${email}:${token}`).toString(
              "base64"
            )}`,
          },
        }
      );
    } else {
      response = await axios.get(
        `${constants.JIRA_BASE_URL}/rest/api/3/search`,
        {
          params: {
            jql: "assignee is EMPTY AND resolution=Unresolved",
          },
          headers: {
            Authorization: `Basic ${Buffer.from(`${email}:${token}`).toString(
              "base64"
            )}`,
          },
        }
      );
    }
    return response;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  getJiraResponse,
};
