import xml2js from 'xml2js'

export function parseJunit(junit: string): string {
  let result = ''

  xml2js.parseString(junit, (err, result) => {
    const meta = result.testsuites.testsuite[0].$
    result = `**Tests**: ${meta.tests}\n
**Assertions**: ${meta.assertions}\n
**Errors**: ${meta.errors}\n
**Warnings**: ${meta.warnings} \n 
**Failures**: ${meta.failures} \n 
**Skipped**: ${meta.skipped}\b
**Time**: ${meta.time}`
  })

  return result
}
