interface TemplateInterface {
  generate(workflow: string, name: string): Promise<object>
}
