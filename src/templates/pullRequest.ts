import {BaseTemplate} from './baseTemplate.js'
import * as Webhooks from '@octokit/webhooks'
import * as core from '@actions/core'
import * as github from '@actions/github'

export class PullRequestTemplate extends BaseTemplate {
  async get(): Promise<object> {
    const repoName = `[${this.context.payload.repository?.name}](${this.context.payload.repository?.html_url})`
    const prName = `[${this.context.payload.pull_request?.title}](${this.context.payload.pull_request?.html_url})`
    const status = 'success'
    const branch = `from **${process.env.GITHUB_HEAD_REF}** to **${process.env.GITHUB_BASE_REF}**`

    return {
      text: `### ${this.context.workflow} ${prName} ${status} ###`,
      username: 'Uncle Github',
      attachments: [
        {
          color: this.getColor(),
          title: `${this.context.workflow} ${prName} ${status}`,
          fields: [
            {
              short: true,
              title: ':github: Repository:',
              value: repoName
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
              value: ''
              // 'value': (await getCommits()).join('\n'),
            }
          ]
        }
      ]
    }
  }
}
