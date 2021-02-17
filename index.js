import {App} from './src/app.js';
import {GithubApi} from './src/githubApi.js';
import {ArtifactApi} from './src/artifactApi.js';

const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');
const fs = require('fs');

const octokit = github.getOctokit(core.getInput('git_token'));
const artifactClient = require('@actions/artifact').create();

const App = new App(
    github,
    new GithubApi(github, octokit),
    new ArtifactApi(github, artifactClient, fs),
);

App.generate(github).then((msg) => {
  const webhook = core.getInput('mattermost_webhook');
  axios.post(webhook, msg).then(() => {
    console.log('sent');
  }).catch(function(error) {
    console.log(error);
  });
});
