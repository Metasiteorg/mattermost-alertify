import {MsgGenerator} from './msgGenerator'
import {GithubApi} from './githubApi'
import {ArtifactApi} from './artifactApi'
import * as core from '@actions/core'
import * as github from '@actions/github'
import * as artifact from '@actions/artifact'
import * as fs from 'fs'
import axios from 'axios'
import './string.impl'
import {EveryJobTemplateFactory} from './templates/everyJobTemplateFactory'
import {ArtifactAttachmentProvider} from './providers/ArtifactAttachmentProvider'
import {PushCommitsProvider} from './providers/PushCommitsProvider'
import {PullRequestCommitsProvider} from './providers/PullRequestCommitsProvider'
import {PullRequestDataProvider} from './providers/PullRequestDataProvider'
import {PushDataProvider} from './providers/PushDataProvider'

async function start() {
  const octokit = github.getOctokit(core.getInput('git_token'))
  const githubApi = new GithubApi(github.context, octokit)
  const artifactApi = new ArtifactApi(
    artifact.create(),
    fs.readFileSync,
    fs.readdirSync
  )

  const App = new MsgGenerator({
    push: () => {
      return EveryJobTemplateFactory.createFromProviders(
        new PushCommitsProvider(),
        new ArtifactAttachmentProvider(githubApi, artifactApi),
        new PushDataProvider(github.context)
      )
    },
    pull_request: () => {
      return EveryJobTemplateFactory.createFromProviders(
        new PullRequestCommitsProvider(github.context, githubApi),
        new ArtifactAttachmentProvider(githubApi, artifactApi),
        new PullRequestDataProvider(github.context)
      )
    }
  })

  App.generate(github.context).then(msg => {
    axios
      .post(core.getInput('mattermost_webhook'), JSON.stringify(msg), {
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
}

start().then(() => console.log('success'))
