import {BaseTemplate} from './baseTemplate.js';

export class PushTemplate extends BaseTemplate {
  constructor(github, artifactApi, githubApi) {
    super(github, artifactApi, githubApi);
  }

  async get() {
    const repoName = `[${this.github.context.payload.repository.name}](${this.github.context.payload.repository.html_url})`;
    const prName = `[${this.github.context.payload.pull_request.title}](${this.github.context.payload.pull_request.html_url})`;
    const status = 'success';
    const color = status === 'success' ? '#00FF00' : '#FF0000';
    const branch = `${process.env.GITHUB_REF}`;

    return {
      'text': `### ${github.context.workflow} ${prName} ${status} ###`,
      'username': 'Uncle Github',
      'attachments': [
        {
          'color': '' + color + '',
          'title': `${this.github.context.workflow} ${prName} ${status}`,
          'fields': [
            {'short': true, 'title': ':github: Repository:', 'value': repoName},
            {
              'short': true,
              'title': ':docker: Image name:',
              'value': '${image_name}',
            },
            {
              'short': true,
              'title': ':git: Branch name',
              'value': '' + branch + '',
            },
            {
              'short': true,
              'title': ':phpunit: Tests',
              'value': (await this.tests()),
            },
            {
              'short': true,
              'title': ':coverage: Tests Coverage',
              'value': (await this.coverage()),
            },
            {
              'short': true,
              'title': `:phpcs: Code Quality ${(await this.codeQuality())}`,
              'value': '',
            },
            {
              'short': false,
              'title': ':commits: Commits',
              'value': (await getCommits()).join('\n'),
            },
          ],
        }],
    };
  }
}
