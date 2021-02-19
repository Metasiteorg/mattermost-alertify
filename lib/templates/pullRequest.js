"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullRequestTemplate = void 0;
const baseTemplate_js_1 = require("./baseTemplate.js");
class PullRequestTemplate extends baseTemplate_js_1.BaseTemplate {
    get() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const repoName = `[${(_a = this.context.payload.repository) === null || _a === void 0 ? void 0 : _a.name}](${(_b = this.context.payload.repository) === null || _b === void 0 ? void 0 : _b.html_url})`;
            const prName = `[${(_c = this.context.payload.pull_request) === null || _c === void 0 ? void 0 : _c.title}](${(_d = this.context.payload.pull_request) === null || _d === void 0 ? void 0 : _d.html_url})`;
            const status = 'success';
            const branch = `from **${process.env.GITHUB_HEAD_REF}** to **${process.env.GITHUB_BASE_REF}**`;
            return {
                text: `### ${this.context.workflow} ${prName} ${status} ###`,
                username: 'Uncle Github',
                attachments: [
                    {
                        color: this.getColor(),
                        title: `${this.context.workflow} ${prName} ${status}`,
                        fields: [
                            {
                                short: true,
                                title: ':github: Repository:',
                                value: repoName
                            },
                            {
                                short: true,
                                title: ':git: Branch name',
                                value: '' + branch + ''
                            },
                            {
                                short: true,
                                title: ':phpunit: Tests',
                                value: yield this.artifactApi.tests()
                            },
                            {
                                short: true,
                                title: ':coverage: Tests Coverage',
                                value: yield this.artifactApi.coverage()
                            },
                            {
                                short: true,
                                title: `:phpcs: Code Quality ${yield this.artifactApi.codeQuality()}`,
                                value: ''
                            },
                            {
                                short: false,
                                title: ':commits: Commits',
                                value: ''
                                // 'value': (await getCommits()).join('\n'),
                            }
                        ]
                    }
                ]
            };
        });
    }
}
exports.PullRequestTemplate = PullRequestTemplate;
