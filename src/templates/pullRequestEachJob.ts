import {BaseTemplate} from './baseTemplate'

export class pullRequestEachJob extends BaseTemplate {
  async get(): Promise<object> {
    const results = await this.githubApi.getJobs()
    let jobs = results.data.jobs
    jobs = jobs.filter(job => {
      return job.status === 'completed'
    })

    let attachments = []
    for (const job of jobs) {
      attachments.push({
        title: job.name,
        title_link: job.html_url,
        color: job.conclusion === 'failure' ? '#FF0000' : '#00FF00'
      })
    }

    return {
      username: 'Uncle Github',
      attachments: attachments
    }
  }
}
