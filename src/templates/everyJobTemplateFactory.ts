import {EveryJobTemplate} from './everyJobTemplate'
import {DataProviderInterface} from '../providers/DataProviderInterface'

export class EveryJobTemplateFactory {
  static async createFromProviders(
    commitsProvider: CommitsProviderInterface,
    attachmentsProvider: AttachmentProviderInterface,
    dataProvider: DataProviderInterface
  ) {
    return new EveryJobTemplate(
      await commitsProvider.get(),
      await attachmentsProvider.get(),
      dataProvider.get()
    )
  }
}
