import {Context} from '@actions/github/lib/context'
import {GitHub} from '@actions/github/lib/utils'
import internal from 'stream'

export class GithubApi {
  private readonly context
  private readonly octokit: InstanceType<typeof GitHub>

  constructor(context: Context, octokit: InstanceType<typeof GitHub>) {
    this.context = context
    this.octokit = octokit
  }

  public async getJobs() {
    return this.octokit.request(
      'GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs',
      {
        ...this.context.repo,
        run_id: Number(process.env.GITHUB_RUN_ID)
      }
    )
  }

  public async getPullRequestCommits(pullRequestID: number) {
    return this.octokit
      .request('GET /repos/{owner}/{repo}/pulls/{pull_number}/commits', {
        ...this.context.repo,
        pull_number: pullRequestID
      })
      .then(data => {
        return data.data.map(commit => {
          return `* [${commit.committer?.login}](${commit.committer?.html_url}): [${commit.commit.message}](${commit.html_url})`
        })
      })
  }

  public async getStatus(): Promise<boolean> {
    return this.octokit
      .request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs', {
        ...this.context.repo,
        run_id: Number(process.env.GITHUB_RUN_ID)
      })
      .then(data => {
        for (const job of data.data.jobs) {
          if (job.conclusion === 'failure') {
            return false
          }
        }

        return true
      })
  }
}
