import {ArtifactClient} from '@actions/artifact'
import {readFileSync} from 'fs'
import {parseStringPromise} from 'xml2js'

export class ArtifactApi {
  private readonly client: ArtifactClient
  private readonly reader: typeof readFileSync
  private readonly parser: typeof parseStringPromise

  constructor(
    client: ArtifactClient,
    reader: typeof readFileSync,
    parser: typeof parseStringPromise
  ) {
    this.client = client
    this.reader = reader
    this.parser = parser
  }

  async coverage() {
    const downloadResponse = await this.client.downloadArtifact(
      'code-coverage-report',
      'artifacts/storage'
    )
    return this.reader(`${downloadResponse.downloadPath}/coverage.txt`, 'utf8')
  }

  async tests() {
    const downloadResponse = await this.client.downloadArtifact(
      'tests-junit',
      'artifacts/storage'
    )
    const junit = this.reader(
      `${downloadResponse.downloadPath}/junit.xml`,
      'utf8'
    )

    return this.parser(junit).then(function (result) {
      const meta = result.testsuites.testsuite[0].$
      return `**Tests**: ${meta.tests}\n
      **Assertions**: ${meta.assertions}\n
      **Errors**: ${meta.errors}\n
      **Warnings**: ${meta.warnings} \n 
      **Failures**: ${meta.failures} \n 
      **Skipped**: ${meta.skipped}\b
      **Time**: ${meta.time}`
    })
  }

  async codeQuality() {
    const downloadResponse = await this.client.downloadArtifact(
      'code-quality',
      'artifacts/storage'
    )
    const data = this.reader(
      `${downloadResponse.downloadPath}/codequality.txt`,
      'utf8'
    )

    return data.length > 1 ? ':x:' : ':white_check_mark:'
  }
}
