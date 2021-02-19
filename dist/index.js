var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
System.register("artifactApi", [], function (exports_1, context_1) {
    "use strict";
    var ArtifactApi;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            ArtifactApi = /** @class */ (function () {
                function ArtifactApi(github, client, fs) {
                    this.github = github;
                    this.client = client;
                    this.fs = fs;
                }
                ArtifactApi.prototype.coverage = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var downloadResponse;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.client.downloadArtifact('code-coverage-report', 'artifacts/storage')];
                                case 1:
                                    downloadResponse = _a.sent();
                                    return [2 /*return*/, this.fs.readFileSync(downloadResponse.downloadPath + "/coverage.txt", 'utf8')];
                            }
                        });
                    });
                };
                ArtifactApi.prototype.tests = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var downloadResponse, junit;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.client.downloadArtifact('tests-junit', 'artifacts/storage')];
                                case 1:
                                    downloadResponse = _a.sent();
                                    junit = this.fs.readFileSync(downloadResponse.downloadPath + "/junit.xml", 'utf8');
                                    return [2 /*return*/, require('xml2js').
                                            parseStringPromise(junit).
                                            then(function (result) {
                                            var meta = result.testsuites.testsuite[0].$;
                                            return "**Tests**: " + meta.tests + "\n\n      **Assertions**: " + meta.assertions + "\n\n      **Errors**: " + meta.errors + "\n\n      **Warnings**: " + meta.warnings + " \n \n      **Failures**: " + meta.failures + " \n \n      **Skipped**: " + meta.skipped + "\b\n      **Time**: " + meta.time;
                                        })];
                            }
                        });
                    });
                };
                ArtifactApi.prototype.codeQuality = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var downloadResponse, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.client.downloadArtifact('code-quality', 'artifacts/storage')];
                                case 1:
                                    downloadResponse = _a.sent();
                                    data = this.fs.readFileSync(downloadResponse.downloadPath + "/codequality.txt", 'utf8');
                                    return [2 /*return*/, data.length > 1 ? ':x:' : ':white_check_mark:'];
                            }
                        });
                    });
                };
                return ArtifactApi;
            }());
            exports_1("ArtifactApi", ArtifactApi);
        }
    };
});
System.register("githubApi", [], function (exports_2, context_2) {
    "use strict";
    var GithubApi;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            GithubApi = /** @class */ (function () {
                function GithubApi(github, octokit) {
                    this.github = github;
                    this.octokit = octokit;
                }
                GithubApi.prototype.getStatus = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            this.octokit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs', {
                                owner: this.github.context.repo.owner,
                                repo: this.github.context.repo.repo,
                                run_id: process.env.GITHUB_RUN_ID
                            }).then(function (data) {
                                for (var _i = 0, _a = data.jobs; _i < _a.length; _i++) {
                                    var job = _a[_i];
                                    if (job.conclusion === 'failure') {
                                        return false;
                                    }
                                }
                                return true;
                            });
                            return [2 /*return*/];
                        });
                    });
                };
                return GithubApi;
            }());
            exports_2("GithubApi", GithubApi);
        }
    };
});
System.register("templates/baseTemplate", [], function (exports_3, context_3) {
    "use strict";
    var BaseTemplate;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            BaseTemplate = /** @class */ (function () {
                function BaseTemplate(github, artifactApi, githubApi) {
                    this.github = github;
                    this.artifactApi = artifactApi;
                    this.githubApi = githubApi;
                }
                BaseTemplate.prototype.getColor = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var status;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.githubApi.getStatus()];
                                case 1:
                                    status = _a.sent();
                                    return [2 /*return*/, status ? '#00FF00' : '#FF0000'];
                            }
                        });
                    });
                };
                return BaseTemplate;
            }());
            exports_3("BaseTemplate", BaseTemplate);
        }
    };
});
System.register("templates/push", ["templates/baseTemplate"], function (exports_4, context_4) {
    "use strict";
    var baseTemplate_js_1, PushTemplate;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [
            function (baseTemplate_js_1_1) {
                baseTemplate_js_1 = baseTemplate_js_1_1;
            }
        ],
        execute: function () {
            PushTemplate = /** @class */ (function (_super) {
                __extends(PushTemplate, _super);
                function PushTemplate(github, artifactApi, githubApi) {
                    return _super.call(this, github, artifactApi, githubApi) || this;
                }
                PushTemplate.prototype.get = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var repoName, prName, status, color, branch, _a, _b, _c, _d, _e, _f, _g;
                        var _h, _j, _k, _l, _m;
                        return __generator(this, function (_o) {
                            switch (_o.label) {
                                case 0:
                                    repoName = "[" + this.github.context.payload.repository.name + "](" + this.github.context.payload.repository.html_url + ")";
                                    prName = "[" + this.github.context.payload.pull_request.title + "](" + this.github.context.payload.pull_request.html_url + ")";
                                    status = 'success';
                                    color = status === 'success' ? '#00FF00' : '#FF0000';
                                    branch = "" + process.env.GITHUB_REF;
                                    _h = {
                                        'text': "### " + this.github.context.workflow + " " + prName + " " + status + " ###",
                                        'username': 'Uncle Github'
                                    };
                                    _a = 'attachments';
                                    _j = {
                                        'color': '' + color + '',
                                        'title': this.github.context.workflow + " " + prName + " " + status
                                    };
                                    _b = 'fields';
                                    _c = [{
                                            'short': true,
                                            'title': ':github: Repository:',
                                            'value': repoName
                                        },
                                        {
                                            'short': true,
                                            'title': ':docker: Image name:',
                                            'value': '${image_name}'
                                        },
                                        {
                                            'short': true,
                                            'title': ':git: Branch name',
                                            'value': '' + branch + ''
                                        }];
                                    _k = {
                                        'short': true,
                                        'title': ':phpunit: Tests'
                                    };
                                    _d = 'value';
                                    return [4 /*yield*/, this.artifactApi.tests()];
                                case 1:
                                    _c = _c.concat([
                                        (_k[_d] = (_o.sent()),
                                            _k)
                                    ]);
                                    _l = {
                                        'short': true,
                                        'title': ':coverage: Tests Coverage'
                                    };
                                    _e = 'value';
                                    return [4 /*yield*/, this.artifactApi.coverage()];
                                case 2:
                                    _c = _c.concat([
                                        (_l[_e] = (_o.sent()),
                                            _l)
                                    ]);
                                    _m = {
                                        'short': true
                                    };
                                    _f = 'title';
                                    _g = ":phpcs: Code Quality ";
                                    return [4 /*yield*/, this.artifactApi.codeQuality()];
                                case 3: return [2 /*return*/, (_h[_a] = [
                                        (_j[_b] = _c.concat([
                                            (_m[_f] = _g + (_o.sent()),
                                                _m['value'] = '',
                                                _m),
                                            {
                                                'short': false,
                                                'title': ':commits: Commits',
                                                'value': 'test'
                                            }
                                        ]),
                                            _j)
                                    ],
                                        _h)];
                            }
                        });
                    });
                };
                return PushTemplate;
            }(baseTemplate_js_1.BaseTemplate));
            exports_4("PushTemplate", PushTemplate);
        }
    };
});
System.register("templates/pullRequest", ["templates/baseTemplate"], function (exports_5, context_5) {
    "use strict";
    var baseTemplate_js_2, PullRequestTemplate;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [
            function (baseTemplate_js_2_1) {
                baseTemplate_js_2 = baseTemplate_js_2_1;
            }
        ],
        execute: function () {
            PullRequestTemplate = /** @class */ (function (_super) {
                __extends(PullRequestTemplate, _super);
                function PullRequestTemplate(github, artifactApi, githubApi) {
                    return _super.call(this, github, artifactApi, githubApi) || this;
                }
                PullRequestTemplate.prototype.get = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var repoName, prName, status, branch, _a, _b, _c, _d, _e, _f, _g;
                        var _h, _j, _k, _l, _m;
                        return __generator(this, function (_o) {
                            switch (_o.label) {
                                case 0:
                                    repoName = "[" + this.github.context.payload.repository.name + "](" + this.github.context.payload.repository.html_url + ")";
                                    prName = "[" + this.github.context.payload.pull_request.title + "](" + this.github.context.payload.pull_request.html_url + ")";
                                    status = 'success';
                                    branch = "from **" + process.env.GITHUB_HEAD_REF + "** to **" + process.env.GITHUB_BASE_REF + "**";
                                    _h = {
                                        'text': "### " + this.github.context.workflow + " " + prName + " " + status + " ###",
                                        'username': 'Uncle Github'
                                    };
                                    _a = 'attachments';
                                    _j = {
                                        'color': this.getColor(),
                                        'title': this.github.context.workflow + " " + prName + " " + status
                                    };
                                    _b = 'fields';
                                    _c = [{
                                            'short': true,
                                            'title': ':github: Repository:',
                                            'value': repoName
                                        },
                                        {
                                            'short': true,
                                            'title': ':git: Branch name',
                                            'value': '' + branch + ''
                                        }];
                                    _k = {
                                        'short': true,
                                        'title': ':phpunit: Tests'
                                    };
                                    _d = 'value';
                                    return [4 /*yield*/, this.artifactApi.tests()];
                                case 1:
                                    _c = _c.concat([
                                        (_k[_d] = (_o.sent()),
                                            _k)
                                    ]);
                                    _l = {
                                        'short': true,
                                        'title': ':coverage: Tests Coverage'
                                    };
                                    _e = 'value';
                                    return [4 /*yield*/, this.artifactApi.coverage()];
                                case 2:
                                    _c = _c.concat([
                                        (_l[_e] = (_o.sent()),
                                            _l)
                                    ]);
                                    _m = {
                                        'short': true
                                    };
                                    _f = 'title';
                                    _g = ":phpcs: Code Quality ";
                                    return [4 /*yield*/, this.artifactApi.codeQuality()];
                                case 3: return [2 /*return*/, (_h[_a] = [
                                        (_j[_b] = _c.concat([
                                            (_m[_f] = _g + (_o.sent()),
                                                _m['value'] = '',
                                                _m),
                                            {
                                                'short': false,
                                                'title': ':commits: Commits',
                                                'value': ''
                                            }
                                        ]),
                                            _j)
                                    ],
                                        _h)];
                            }
                        });
                    });
                };
                return PullRequestTemplate;
            }(baseTemplate_js_2.BaseTemplate));
            exports_5("PullRequestTemplate", PullRequestTemplate);
        }
    };
});
System.register("msgGenerator", ["templates/push", "templates/pullRequest"], function (exports_6, context_6) {
    "use strict";
    var push_js_1, pullRequest_js_1, MsgGenerator;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (push_js_1_1) {
                push_js_1 = push_js_1_1;
            },
            function (pullRequest_js_1_1) {
                pullRequest_js_1 = pullRequest_js_1_1;
            }
        ],
        execute: function () {
            MsgGenerator = /** @class */ (function () {
                function MsgGenerator(github, githubapi, artifactapi) {
                    this.templates = {
                        'push': new push_js_1.PushTemplate(github, artifactapi, githubapi),
                        'pull_request': new pullRequest_js_1.PullRequestTemplate(github, artifactapi, githubapi)
                    };
                }
                MsgGenerator.prototype.generate = function (github) {
                    return __awaiter(this, void 0, void 0, function () {
                        var template;
                        return __generator(this, function (_a) {
                            template = this.templates[github.context.eventName];
                            if (template !== null) {
                                return [2 /*return*/, template.get()];
                            }
                            return [2 /*return*/];
                        });
                    });
                };
                return MsgGenerator;
            }());
            exports_6("MsgGenerator", MsgGenerator);
        }
    };
});
System.register("index", ["msgGenerator", "githubApi", "artifactApi"], function (exports_7, context_7) {
    "use strict";
    var msgGenerator_1, githubApi_1, artifactApi_1, core, github, axios, fs, octokit, artifactClient, App;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (msgGenerator_1_1) {
                msgGenerator_1 = msgGenerator_1_1;
            },
            function (githubApi_1_1) {
                githubApi_1 = githubApi_1_1;
            },
            function (artifactApi_1_1) {
                artifactApi_1 = artifactApi_1_1;
            }
        ],
        execute: function () {
            core = require('@actions/core');
            github = require('@actions/github');
            axios = require('axios');
            fs = require('fs');
            octokit = github.getOctokit(core.getInput('git_token'));
            artifactClient = require('@actions/artifact').create();
            App = new msgGenerator_1.MsgGenerator(github, new githubApi_1.GithubApi(github, octokit), new artifactApi_1.ArtifactApi(github, artifactClient, fs));
            App.generate(github).then(function (msg) {
                var webhook = core.getInput('mattermost_webhook');
                axios.post(webhook, msg).then(function () {
                    console.log('sent');
                })["catch"](function (error) {
                    console.log(error);
                });
            });
        }
    };
});
