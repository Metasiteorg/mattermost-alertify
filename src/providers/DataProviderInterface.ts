export type MsgData = {title: string; titleUrl: string}

export interface DataProviderInterface {
  get(): MsgData
}
