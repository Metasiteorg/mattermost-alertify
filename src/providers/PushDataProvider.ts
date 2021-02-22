import {DataProviderInterface, MsgData} from './DataProviderInterface'
import {Context} from '@actions/github/lib/context'

export class PushDataProvider implements DataProviderInterface {
  constructor(private readonly context: Context) {}

  get(): MsgData {
    return {
      title: `${process.env.GITHUB_REF}`.ucFirstAll(),
      branch: `Push to: \`${process.env.GITHUB_REF}\``
    }
  }
}
