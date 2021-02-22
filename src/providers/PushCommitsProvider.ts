export class PushCommitsProvider implements CommitsProviderInterface {
  get(): Promise<string[]> {
    return Promise.resolve(['Testing Commit for PUSH (not implemented)'])
  }
}
