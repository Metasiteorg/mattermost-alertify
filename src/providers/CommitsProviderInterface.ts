interface CommitsProviderInterface {
  get(): Promise<string[]>
}
