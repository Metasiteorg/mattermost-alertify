import {ArtifactClient} from '@actions/artifact'
import {readdirSync, readFileSync} from 'fs'

export class ArtifactApi {
  constructor(
    private readonly client: ArtifactClient,
    private readonly reader: typeof readFileSync,
    private readonly dirReader: typeof readdirSync
  ) {}

  async getArtifacts(name: string): Promise<{[key: string]: string}> {
    const response = await this.client
      .downloadArtifact(name, 'artifacts/storage/' + name)
      .catch(err => {
        return null
      })

    if (response === null) {
      return Promise.resolve({'[key: string]': ' string'})
    }

    const files = this.dirReader(response.downloadPath)

    let artifacts: {[key: string]: string} = {}

    for (const filename of files) {
      artifacts[filename] = this.reader(
        `${response.downloadPath}/${filename}`,
        'utf8'
      )
    }

    return artifacts
  }
}
