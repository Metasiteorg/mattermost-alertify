import {MsgData} from '../providers/DataProviderInterface'

export class EveryJobTemplate implements TemplateInterface {
  constructor(
    private readonly commits: string[],
    private readonly attachments: object[],
    private readonly data: MsgData
  ) {}

  async generate(name: string, workflow: string): Promise<object> {
    return {
      username: 'Uncle Github',
      text: `${name} ${workflow} (\`${process.env.GITHUB_HEAD_REF}\` -> \`${process.env.GITHUB_BASE_REF})\``,
      title: this.data.title,
      title_link: this.data.titleUrl,
      attachments: this.attachments,
      props: {
        card: this.commits.join('\n')
      }
    }
  }
}
