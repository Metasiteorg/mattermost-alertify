import {BaseTemplate} from './baseTemplate'
import {parseJunit} from '../junitParser'

export class eachJob extends BaseTemplate {
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
        const [title] = name.replace('-', ' ').ucFirstAll().split('.')

        fields.push({
          short: true,
          title: title,
          value:
            title === 'Junit'
              ? await parseJunit(artifactFiles[name])
              : artifactFiles[name]
        })
      }

      attachments.push({
        title: job.name,
        title_link: job.html_url,
        color: job.conclusion === 'failure' ? '#FF0000' : '#00FF00',
        fields: fields
      })
    }

    let commits: string[] = []
    if (this.context.payload.pull_request?.number) {
      commits = await this.githubApi.getPullRequestCommits(
        this.context.payload.pull_request?.number
      )
    }

    const prName = `[${this.context.payload.pull_request?.title}](${this.context.payload.pull_request?.html_url})`
    return {
      username: 'Uncle Github',
      text: `${this.context.workflow} ${prName} (\`${process.env.GITHUB_HEAD_REF}\` -> \`${process.env.GITHUB_BASE_REF})\``,
      attachments: attachments,
      props: {
        card: commits.join('\n')
      }
    }
  }
}
