import {Context} from '@actions/github/lib/context'
import {ArtifactApi} from '../artifactApi'
import {GithubApi} from '../githubApi'

export abstract class BaseTemplate {
  protected readonly context: Context
  protected readonly artifactApi: ArtifactApi
  protected readonly githubApi: GithubApi

  constructor(
    context: Context,
    artifactApi: ArtifactApi,
    githubApi: GithubApi
  ) {
    this.context = context
    this.artifactApi = artifactApi
    this.githubApi = githubApi
  }

  protected async getColor(): Promise<string> {
    const status = await this.githubApi.getStatus()
    return status ? '#00FF00' : '#FF0000'
  }

  public abstract get(): Promise<object>
}
