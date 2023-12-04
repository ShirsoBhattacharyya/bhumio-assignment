const jiraService = require("../services/jira.service");
const constants = require("../constants/jira.constant");

const getJira = async (req, res) => {
  try {
    const jiraApiToken = constants.JIRA_API_TOKEN;
    const email = constants.JIRA_EMAIL_ID;

    // Fetching assigned tasks
    const assignedResponse = await jiraService.getJiraResponse(
      jiraApiToken,
      email,
      true
    );
    const assignedTickets = [];
    assignedResponse.data.issues.forEach((issue) => {
      const displayName = issue.fields.assignee.displayName;
      const existingObj = assignedTickets.find(
        (obj) => obj.name === displayName
      );
      if (!existingObj) {
        assignedTickets.push({ name: displayName, count: 1 });
      } else {
        existingObj.count += 1;
      }
    });
    const assignedTasks = assignedTickets;

    // Fetching unassigned tasks
    const unassignedResponse = await jiraService.getJiraResponse(
      jiraApiToken,
      email,
      false
    );
    const unassignedTasks = unassignedResponse.data.total;

    res.json({
      assignedTasks,
      unassignedTasks,
      totalTasks: assignedResponse?.data?.total + unassignedTasks,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { getJira };
