import {BaseTemplate} from './baseTemplate.js'

export class PushTemplate extends BaseTemplate {
  async get() {
    const repoName = `[${this.context.payload.repository?.name}](${this.context.payload.repository?.html_url})`
    const prName = `[${this.context.payload.pull_request?.title}](${this.context.payload.pull_request?.html_url})`
    const status = 'success'
    const color = status === 'success' ? '#00FF00' : '#FF0000'
    const branch = `${process.env.GITHUB_REF}`

    return {
      text: `### ${this.context.workflow} ${prName} ${status} ###`,
      username: 'Uncle Github',
      attachments: [
        {
          color: '' + color + '',
          title: `${this.context.workflow} ${prName} ${status}`,
          fields: [
            {
              short: true,
              title: ':github: Repository:',
              value: repoName
            },
            {
              short: true,
              title: ':docker: Image name:',
              value: '${image_name}'
            },
            {
              short: true,
              title: ':git: Branch name',
              value: '' + branch + ''
            },
            {
              short: true,
              title: ':phpunit: Tests',
              value: await this.artifactApi.tests()
            },
            {
              short: true,
              title: ':coverage: Tests Coverage',
              value: await this.artifactApi.coverage()
            },
            {
              short: true,
              title: `:phpcs: Code Quality ${await this.artifactApi.codeQuality()}`,
              value: ''
            },
            {
              short: false,
              title: ':commits: Commits',
              value: 'test'
            }
          ]
        }
      ]
    }
  }
}
