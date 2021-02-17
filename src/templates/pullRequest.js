import {BaseTemplate} from './baseTemplate.js';

export class PullRequestTemplate extends BaseTemplate {
  constructor(github, artifactApi, githubApi) {
    super(github, artifactApi, githubApi);
  }

  async get() {
    const repoName = `[${this.github.context.payload.repository.name}](${this.github.context.payload.repository.html_url})`;
    const prName = `[${this.github.context.payload.pull_request.title}](${this.github.context.payload.pull_request.html_url})`;
    const status = 'success';
    const branch = `from **${process.env.GITHUB_HEAD_REF}** to **${process.env.GITHUB_BASE_REF}**`;

    return {
      'text': `### ${this.github.context.workflow} ${prName} ${status} ###`,
      'username': 'Uncle Github',
      'attachments': [
        {
          'color': this.getColor(),
          'title': `${this.github.context.workflow} ${prName} ${status}`,
          'fields': [
            {'short': true, 'title': ':github: Repository:', 'value': repoName},
            // { 'short': true, 'title': ':docker: Image name:', 'value': '${image_name}' },
            {
              'short': true,
              'title': ':git: Branch name',
              'value': '' + branch + '',
            },
            {
              'short': true,
              'title': ':phpunit: Tests',
              'value': (await this.artifactApi.tests()),
            },
            {
              'short': true,
              'title': ':coverage: Tests Coverage',
              'value': (await this.artifactApi.coverage()),
            },
            {
              'short': true,
              'title': `:phpcs: Code Quality ${(await this.artifactApi.codeQuality())}`,
              'value': '',
            },
            {
              'short': false,
              'title': ':commits: Commits',
              'value': '',
              // 'value': (await getCommits()).join('\n'),
            },
          ],
        }],
    };
  }
}
