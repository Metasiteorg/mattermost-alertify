export type MsgData = {
  title: string
  branch: string
}

export interface DataProviderInterface {
  get(): MsgData
}
