const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json(`Welcome to JIRA Dashboard API.`);
});

app.use("/api/", routes);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/api`);
});
