const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());

const port = 3031;
const url = "https://api.github.com";

app.get("/repos/:org", function(req, res, next) {
  const org = req.params.org;
  return axios({
    method: "get",
    url: `${url}/orgs/${org}/repos`,
    headers: { Authorization: `token ${process.env.GITHUB_API_TOKEN}` }
  })
    .then(axiosResp => {
      res.send(axiosResp.data);
    })
    .catch(e => {
      res.send(e);
    });
});

app.get("/repos/:org/issues/:repository", function(req, res, next) {
  const org = req.params.org;
  const repository = req.params.repository;
  return axios({
    method: "get",
    url: `${url}/repos/${org}/${repository}/issues`,
    headers: { Authorization: `token ${process.env.GITHUB_API_TOKEN}` }
  })
    .then(axiosResp => {
      res.send(axiosResp.data);
    })
    .catch(e => {
      res.send(e);
    });
});

app.get("/repos/:org/issues/:repository/comments/:issueId", function(req, res, next) {
  const org = req.params.org;
  const repository = req.params.repository;
  const issueId = req.params.issueId;
  return axios({
    method: "get",
    url: `${url}/repos/${org}/${repository}/issues/${issueId}/comments`,
    headers: { Authorization: `token ${process.env.GITHUB_API_TOKEN}` }
  })
    .then(axiosResp => {
      res.send(axiosResp.data);
    })
    .catch(e => {
      res.send(e);
    });
});

app.listen(port, function() {
  console.log(`Server is running in ${port}`);
});
