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
exports.MsgGenerator = void 0;
const push_js_1 = require("./templates/push.js");
const pullRequest_js_1 = require("./templates/pullRequest.js");
class MsgGenerator {
    constructor(context, githubApi, artifactApi) {
        this.templates = {
            push: new push_js_1.PushTemplate(context, artifactApi, githubApi),
            pull_request: new pullRequest_js_1.PullRequestTemplate(context, artifactApi, githubApi)
        };
    }
    generate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const template = this.templates[context.eventName];
            if (template !== null) {
                return template.get();
            }
        });
    }
}
exports.MsgGenerator = MsgGenerator;
