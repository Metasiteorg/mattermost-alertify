const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const config = {
    headers: {
        'authorization': `Bearer ${core.getInput('git_token')}`,
        'content-type': 'application/json'
    }
};

async function getHTMLUrl(apiUrl) {
    const response = await axios.get(apiUrl, config);
    return response.data.html_url
}

async function getCommits() {
    try {
        const response = await axios.get(github.context.payload.pull_request.commits_url, config);

        let commits = [];
        for (const item of response.data) {
            let url = await getHTMLUrl(item.url);
            commits.push(`:commit: ${item.committer.login}: [${item.commit.message}](${url})`);
        }

        return commits;
    } catch (err) {
        console.error(err)
    }
}

async function generateMessage() {
    const repoName = `[${github.context.payload.repository.name}](${github.context.payload.repository.html_url})`
    const prName = `[${github.context.payload.pull_request.title}](${github.context.payload.pull_request.html_url})`
    const status = "success"
    const color = status === "success" ? "#00FF00" : "#FF0000"
    const branch = process.env.GITHUB_HEAD_REF

    return {
        "text": `### ${github.context.workflow} ${prName} ${status} ###`,
        "username": "Uncle Github",
        "attachments": [
            {
                "color": "" + color + "",
                "fields": [
                    {"short": true, "title": ":github: Repository:", "value": repoName},
                    {"short": true, "title": ":docker: Image name:", "value": "${image_name}"},
                    {"short": true, "title": ":git: Branch name", "value": "" + branch + ""},
                    {"short": true, "title": ":phpunit: Tests", "value": "${test_unit}"},
                    {"short": true, "title": ":coverage: Tests Coverage", "value": "${test_coverage}"},
                    {"short": true, "title": ":phpcs: Code Style", "value": "${code_style_errors}"},
                    {"short": false, "title": ":commits: Commits", "value": (await getCommits()).join("\n")}
                ]
            }]
    }
}

generateMessage().then((msg) => {
    const webhook = core.getInput('mattermost_webhook');
    axios.post(webhook, msg)
        .then(function (response) {
        })
        .catch(function (error) {
            console.log(error);
        });
})
