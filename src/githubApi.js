export class GithubApi {
  github;
  octokit;

  constructor(github, octokit) {
    this.github = github;
    this.octokit = octokit;
  }

  async getStatus() {
    this.octokit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs',
        {
          owner: this.github.context.repo.owner,
          repo: this.github.context.repo.repo,
          run_id: process.env.GITHUB_RUN_ID,
        },
    ).then(data => {
      for (const job of data.jobs) {
        if (job.conclusion === 'failure') {
          return false;
        }
      }

      return true;
    });
  }
}
