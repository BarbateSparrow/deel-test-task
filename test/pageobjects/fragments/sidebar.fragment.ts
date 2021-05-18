import {step} from '../../../lib'

enum Page {
  CREATE_A_CONTRACT = '/create',
  CONTRACTS = '/contracts'
}

class SidebarFragment {

  get _bar() {return $('.sidebar-inner-div')}

  @step('Sidebar Fragment: go to')
  public async gotTo(page: Page) {
    const bar = await this._bar
    const pageTo = await bar.$(`a[href="${page}"]`)
    await pageTo.waitForClickable()
    await pageTo.click()
  }  
}

export {SidebarFragment, Page}
