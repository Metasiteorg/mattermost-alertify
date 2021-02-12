const core = require('@actions/core');
const github = require('@actions/github');

const webhook = core.getInput('mattermost_webhook');

console.log('test check is it working. :))')

let message = {
    "text": "### {{workflow_status_icon}} MAN-CMS {{workflow_name}} {{workflow_status}} ###",
    "username": "Uncle Github",
    "attachments": [
        {
            "color": "{{color}}",
            "title": "{{pr_name}}",
            "title_link": "{{pr_url}}",
            "fields": [
                {
                    "short": true,
                    "title": ":docker: Image name:",
                    "value": "${image_name}"
                },
                {
                    "short": true,
                    "title": ":phpunit: Tests",
                    "value": "${test_unit}"
                },
                {
                    "short": true,
                    "title": ":coverage: Tests Coverage",
                    "value": "${test_coverage}"
                },
                {
                    "short": true,
                    "title": ":phpcs: Code Style",
                    "value": "${code_style_errors}"
                },
                {
                    "short": true,
                    "title": ":git: Branch name",
                    "value": "{{branch_name}}"
                },
                {
                    "short": false,
                    "title": ":commits: Commits",
                    "value": "{{commit}}"
                }
            ]
        }
    ]
};
