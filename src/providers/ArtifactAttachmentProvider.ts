import {parseJunit} from '../junitParser'
import {GithubApi} from '../githubApi'
import {ArtifactApi} from '../artifactApi'

export class ArtifactAttachmentProvider implements AttachmentProviderInterface {
  constructor(
    private readonly githubApi: GithubApi,
    private readonly artifactApi: ArtifactApi
  ) {}

  async get(): Promise<object[]> {
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

    return attachments
  }
}
