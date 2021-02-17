export class BaseTemplate {
  github;
  artifactApi;
  githubApi;

  constructor(github, artifactApi, githubApi) {
    this.github = github;
    this.artifactApi = artifactApi;
    this.githubApi = githubApi;
  }

  async getColor() {
    const status = await this.githubApi.getStatus();
    return status ? '#00FF00' : '#FF0000';
  }
}
