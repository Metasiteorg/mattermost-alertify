import {Context} from '@actions/github/lib/context'
import {GitHub} from '@actions/github/lib/utils'

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

  public async getArtifacts() {
    return await this.octokit.request(
      'GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts',
      {
        ...this.context.repo,
        run_id: Number(process.env.GITHUB_RUN_ID)
      }
    )
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
