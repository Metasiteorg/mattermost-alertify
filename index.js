const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

console.log(github.context.payload.pull_request);

const status = "success"

const color = status === "success" ? "#00FF00" : "#FF0000"
const icon = status === "success" ? ":white_check_mark:" : ":x:"

// if [ "$JOB_STATUS" = "success" ]; then ICON=':white_check_mark:'; else ICON=':x:'; fi
// if [ "$JOB_STATUS" = "success" ]; then COLOR='#00FF00'; else COLOR='#FF0000'; fi
// if [ "$JOB_STATUS" = "success" ]; then STATUS='Success'; else STATUS='Failed'; fi

const repoName = `[${github.context.payload.repository.name}](${github.context.payload.repository.html_url})`
const prName = `[${github.context.payload.pull_request.title}](${github.context.payload.pull_request.html_url})`

let message = {
    "text": `### ${icon} ${repoName} ${prName} ${status} ###`,
    "username": "Uncle Github",
    "attachments": [
        {
            "color": "" + color + "",
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
                    "value": "" + github.context + ""
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

// const webhook = core.getInput('mattermost_webhook');
// axios.post(webhook, message)
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
