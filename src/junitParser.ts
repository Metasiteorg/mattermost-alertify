import xml2js from 'xml2js'

export function parseJunit(junit: string): Promise<string> {
  return xml2js.parseStringPromise(junit).then(result => {
    const meta = result.testsuites.testsuite[0].$
    return `**Tests**: ${meta.tests}\n
**Assertions**: ${meta.assertions}\n
**Errors**: ${meta.errors}\n
**Warnings**: ${meta.warnings} \n 
**Failures**: ${meta.failures} \n 
**Skipped**: ${meta.skipped}\b
**Time**: ${meta.time}`
  })
}
