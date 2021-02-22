import {DataProviderInterface, MsgData} from './DataProviderInterface'

export class PushDataProvider implements DataProviderInterface {
  get(): MsgData {
    return {
      title: 'test title',
      titleUrl: 'test url'
    }
  }
}
