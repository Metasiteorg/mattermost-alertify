"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var msgGenerator_1 = require("./msgGenerator");
var githubApi_1 = require("./githubApi");
var artifactApi_1 = require("./artifactApi");
var core = require('@actions/core');
var github = require('@actions/github');
var axios = require('axios');
var fs = require('fs');
var octokit = github.getOctokit(core.getInput('git_token'));
var artifactClient = require('@actions/artifact').create();
var App = new msgGenerator_1.MsgGenerator(github, new githubApi_1.GithubApi(github, octokit), new artifactApi_1.ArtifactApi(github, artifactClient, fs));
App.generate(github).then(function (msg) {
    var webhook = core.getInput('mattermost_webhook');
    axios.post(webhook, msg).then(function () {
        console.log('sent');
    }).catch(function (error) {
        console.log(error);
    });
});
