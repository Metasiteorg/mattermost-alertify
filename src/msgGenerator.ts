import {PushTemplate} from './templates/push.js'
import {PullRequestTemplate} from './templates/pullRequest.js'
import {Context} from '@actions/github/lib/context'
import {GithubApi} from './githubApi'
import {ArtifactApi} from './artifactApi'
import {BaseTemplate} from './templates/baseTemplate'
import {pullRequestEachJob} from './templates/pullRequestEachJob'

export class MsgGenerator {
  private readonly templates: {[key: string]: BaseTemplate}

  constructor(
    context: Context,
    githubApi: GithubApi,
    artifactApi: ArtifactApi
  ) {
    this.templates = {
      test: new PushTemplate(context, artifactApi, githubApi),
      pull_request: new pullRequestEachJob(context, artifactApi, githubApi)
      // pull_request: new PullRequestTemplate(context, artifactApi, githubApi)
    }
  }

  async generate(context: Context) {
    const template: BaseTemplate = this.templates[context.eventName]
    if (template !== null) {
      return template.get()
    }
  }
}
