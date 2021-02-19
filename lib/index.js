"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const msgGenerator_1 = require("./msgGenerator");
const githubApi_1 = require("./githubApi");
const artifactApi_1 = require("./artifactApi");
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const artifact = __importStar(require("@actions/artifact"));
const fs = __importStar(require("fs"));
const axios_1 = __importDefault(require("axios"));
const parser = __importStar(require("xml2js"));
const octokit = github.getOctokit(core.getInput('git_token'));
const artifactClient = artifact.create();
const App = new msgGenerator_1.MsgGenerator(github.context, new githubApi_1.GithubApi(github.context, octokit), new artifactApi_1.ArtifactApi(artifactClient, fs.readFileSync, parser.parseStringPromise));
App.generate(github.context).then(msg => {
    const webhook = core.getInput('mattermost_webhook');
    axios_1.default
        .post(webhook, msg)
        .then(() => {
        console.log('sent');
    })
        .catch(function (error) {
        console.log(error);
    });
});
