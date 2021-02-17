import {PushTemplate} from './templates/push';
import {PullRequestTemplate} from './templates/pullRequest';

export class App {
  templates;

  constructor(github, githubapi, artifactapi) {
    this.templates = {
      'push': new PushTemplate(github, artifactapi, githubapi),
      'pull_request': new PullRequestTemplate(github, artifactapi, githubapi),
    };
  }

  async generate(github) {
    const template = this.templates[github.context.eventName];
    if (template !== null) {
      return template.get();
    }
  }
}
