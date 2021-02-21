import {MsgGenerator} from './msgGenerator'
import {GithubApi} from './githubApi'
import {ArtifactApi} from './artifactApi'
import * as core from '@actions/core'
import * as github from '@actions/github'
import * as artifact from '@actions/artifact'
import * as fs from 'fs'
import axios from 'axios'
import * as parser from 'xml2js'

const octokit = github.getOctokit(core.getInput('git_token'))
const artifactClient = artifact.create()

const App = new MsgGenerator(
  github.context,
  new GithubApi(github.context, octokit),
  new ArtifactApi(
    artifactClient,
    fs.readFileSync,
    parser.parseStringPromise,
    fs.readdirSync
  )
)

App.generate(github.context).then(msg => {
  const webhook = core.getInput('mattermost_webhook')
  axios
    .post(webhook, JSON.stringify(msg), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      console.log('sent')
    })
    .catch(function (error) {
      console.log(error)
    })
})
