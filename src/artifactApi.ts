export class ArtifactApi {
    github
    client
    fs

    constructor(github, client, fs) {
      this.github = github;
      this.client = client;
      this.fs = fs;
    }

    async coverage() {
      const downloadResponse = await this.client.downloadArtifact(
          'code-coverage-report', 'artifacts/storage');
      return this.fs.readFileSync(
          `${downloadResponse.downloadPath}/coverage.txt`, 'utf8');
    }

    async tests() {
      const downloadResponse = await this.client.downloadArtifact(
          'tests-junit', 'artifacts/storage');
      const junit = this.fs.readFileSync(
          `${downloadResponse.downloadPath}/junit.xml`, 'utf8');

      return require('xml2js').
          parseStringPromise(junit).
          then(function(result) {
            const meta = result.testsuites.testsuite[0].$;
            return `**Tests**: ${meta.tests}\n
      **Assertions**: ${meta.assertions}\n
      **Errors**: ${meta.errors}\n
      **Warnings**: ${meta.warnings} \n 
      **Failures**: ${meta.failures} \n 
      **Skipped**: ${meta.skipped}\b
      **Time**: ${meta.time}`;
          });
    }

    async codeQuality() {
      const downloadResponse = await this.client.downloadArtifact(
          'code-quality', 'artifacts/storage');
      const data = this.fs.readFileSync(
          `${downloadResponse.downloadPath}/codequality.txt`, 'utf8');

      return data.length > 1 ? ':x:' : ':white_check_mark:';
    }
}
