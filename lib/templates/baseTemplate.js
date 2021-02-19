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
exports.BaseTemplate = void 0;
class BaseTemplate {
    constructor(context, artifactApi, githubApi) {
        this.context = context;
        this.artifactApi = artifactApi;
        this.githubApi = githubApi;
    }
    getColor() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.githubApi.getStatus();
            return status ? '#00FF00' : '#FF0000';
        });
    }
    get() {
        return new Promise(() => { });
    }
}
exports.BaseTemplate = BaseTemplate;
