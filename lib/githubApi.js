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
exports.GithubApi = void 0;
class GithubApi {
    constructor(context, octokit) {
        this.context = context;
        this.octokit = octokit;
    }
    getStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.octokit
                .request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs', Object.assign(Object.assign({}, this.context.repo), { run_id: Number(process.env.GITHUB_RUN_ID) }))
                .then(data => {
                for (const job of data.data.jobs) {
                    if (job.conclusion === 'failure') {
                        return false;
                    }
                }
                return true;
            });
        });
    }
}
exports.GithubApi = GithubApi;
