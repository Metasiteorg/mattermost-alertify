import {GithubApi} from '../githubApi'
import {Context} from '@actions/github/lib/context'

export class PullRequestCommitsProvider implements CommitsProviderInterface {
  constructor(
    private readonly context: Context,
    private readonly githubApi: GithubApi
  ) {}

  get(): Promise<string[]> {
    if (this.context.payload.pull_request?.number) {
      return this.githubApi.getPullRequestCommits(
        this.context.payload.pull_request.number
      )
    }

    return Promise.resolve(['-- No Commits --'])
  }
}
