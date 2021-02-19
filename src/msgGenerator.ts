import {PushTemplate} from './templates/push.js'
import {PullRequestTemplate} from './templates/pullRequest.js'
import {Context} from '@actions/github/lib/context'
import {GithubApi} from './githubApi'
import {ArtifactApi} from './artifactApi'
import {BaseTemplate} from './templates/baseTemplate'

export class MsgGenerator {
  private readonly templates: any

  constructor(
    context: Context,
    githubApi: GithubApi,
    artifactApi: ArtifactApi
  ) {
    this.templates = {
      push: new PushTemplate(context, artifactApi, githubApi),
      pull_request: new PullRequestTemplate(context, artifactApi, githubApi)
    }
  }

  async generate(context: Context) {
    const template: BaseTemplate = this.templates[context.eventName]
    if (template !== null) {
      return template.get()
    }
  }
}
