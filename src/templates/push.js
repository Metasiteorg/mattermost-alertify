"use strict";
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
exports.__esModule = true;
exports.PushTemplate = void 0;
var baseTemplate_js_1 = require("./baseTemplate.js");
var PushTemplate = /** @class */ (function (_super) {
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
                        _c = [{ 'short': true, 'title': ':github: Repository:', 'value': repoName },
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
exports.PushTemplate = PushTemplate;
