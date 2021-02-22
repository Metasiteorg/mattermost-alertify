import {Context} from '@actions/github/lib/context'

export class MsgGenerator {
  constructor(
    private readonly templates: {
      [key: string]: () => Promise<TemplateInterface>
    }
  ) {}

  async generate(context: Context): Promise<object> {
    return this.templates[context.eventName]().then(template => {
      return template.generate(context.workflow, context.eventName)
    })
  }
}
