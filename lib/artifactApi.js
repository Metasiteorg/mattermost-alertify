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
exports.ArtifactApi = void 0;
class ArtifactApi {
    constructor(client, reader, parser) {
        this.client = client;
        this.reader = reader;
        this.parser = parser;
    }
    coverage() {
        return __awaiter(this, void 0, void 0, function* () {
            const downloadResponse = yield this.client.downloadArtifact('code-coverage-report', 'artifacts/storage');
            return this.reader(`${downloadResponse.downloadPath}/coverage.txt`, 'utf8');
        });
    }
    tests() {
        return __awaiter(this, void 0, void 0, function* () {
            const downloadResponse = yield this.client.downloadArtifact('tests-junit', 'artifacts/storage');
            const junit = this.reader(`${downloadResponse.downloadPath}/junit.xml`, 'utf8');
            return this.parser(junit).then(function (result) {
                const meta = result.testsuites.testsuite[0].$;
                return `**Tests**: ${meta.tests}\n
      **Assertions**: ${meta.assertions}\n
      **Errors**: ${meta.errors}\n
      **Warnings**: ${meta.warnings} \n 
      **Failures**: ${meta.failures} \n 
      **Skipped**: ${meta.skipped}\b
      **Time**: ${meta.time}`;
            });
        });
    }
    codeQuality() {
        return __awaiter(this, void 0, void 0, function* () {
            const downloadResponse = yield this.client.downloadArtifact('code-quality', 'artifacts/storage');
            const data = this.reader(`${downloadResponse.downloadPath}/codequality.txt`, 'utf8');
            return data.length > 1 ? ':x:' : ':white_check_mark:';
        });
    }
}
exports.ArtifactApi = ArtifactApi;
