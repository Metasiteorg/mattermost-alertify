import {Context} from '@actions/github/lib/context'
import {DataProviderInterface, MsgData} from './DataProviderInterface'

export class PullRequestDataProvider implements DataProviderInterface {
  constructor(private readonly context: Context) {}

  get(): MsgData {
    return {
      title: `[${this.context.payload.pull_request?.title}](${this.context.payload.pull_request?.html_url})`,
      branch: `(\`${process.env.GITHUB_HEAD_REF}\` -> \`${process.env.GITHUB_BASE_REF}\`)`
    }
  }
}
