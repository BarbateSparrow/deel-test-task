import allureReporter from '@wdio/allure-reporter'

function step(msg) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value
    const reporter = allureReporter

    descriptor.value = async function (...args) {
      reporter.addEnvironment('Browser', await browser.capabilities['browserName'])
      reporter.startStep(msg)

      if (args.length > 0) {
        reporter.addAttachment(`Params:`, args, 'application/json')
      }

      try {
        const result = await method.apply(this, args)
        reporter.endStep('passed')
        return result
      } catch (error) {
        console.log('Error', error);
        reporter.addAttachment('screenshot', error.toString(), 'text/plain')
        try {
          await browser.takeScreenshot()
        } catch (error) {
          if (error.toString().includes('window was already closed')) {
            return
          }
        }
        reporter.endStep('broken')
        throw error
      }
    }
    return descriptor
  }
}

export {step}
