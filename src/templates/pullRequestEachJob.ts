import {BaseTemplate} from './baseTemplate'

export class pullRequestEachJob extends BaseTemplate {
  async get(): Promise<object> {
    const jobs = (await this.githubApi.getJobs()).data.jobs.filter(job => {
      return job.status === 'completed'
    })

    let attachments = []
    for (const job of jobs) {
      const artifactName = job.name.toLowerCase().replace(' ', '-')
      const artifactFiles = await this.artifactApi.getArtifacts(artifactName)

      let fields = []
      for (const name in artifactFiles) {
        const [title] = name.replace('-', ' ').split('.')
        fields.push({
          title: title,
          value: artifactFiles[name]
        })
      }

      attachments.push({
        title: job.name,
        title_link: job.html_url,
        color: job.conclusion === 'failure' ? '#FF0000' : '#00FF00',
        fields: fields
      })
    }

    const prName = `[${this.context.payload.pull_request?.title}](${this.context.payload.pull_request?.html_url})`
    return {
      username: 'Uncle Github',
      text: `Pull Request ${prName} (\`${process.env.GITHUB_HEAD_REF}\` -> \`${process.env.GITHUB_BASE_REF})\``,
      attachments: attachments
    }
  }
}
