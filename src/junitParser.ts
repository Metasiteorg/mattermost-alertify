import xml2js from 'xml2js'

export function parseJunit(junit: string): Promise<string> {
  return xml2js.parseStringPromise(junit).then(result => {
    const meta = result.testsuites.testsuite[0].$

    return `
    | Tests | Assertions | Errors | Warnings | Failures | Skipped | Time |
|-------|------------|------------|----------|----------|---------|------|
| ${meta.tests} | ${meta.assertions} | ${meta.errors} | ${meta.warnings} | ${meta.failures} | ${meta.skipped} | ${meta.time} |`
  })
}
