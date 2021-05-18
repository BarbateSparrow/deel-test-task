import {BaseFragment} from './base.fragment'
import {step} from '../../../../lib'
import {Input, Select} from '../../elements'

interface IComplianceFragment {
  residence?: string
  province?: string
}

class ComplianceFragment extends BaseFragment {
  protected residence: Select
  protected province: Select

  constructor() {
    super()
    this.residence = new Select('[data-qa="contractor-tax-residence"]')
    this.province = new Select('[data-qa="contractor-tax-residence-province"]')
  }

  @step('Compliance Fragment: set data')
  public async set(extras: IComplianceFragment) {
    for (const key of Object.keys(extras)) {
      await this[key].set(extras[key])
    }
  }

  @step('Compliance Fragment: click "Create Contract" button')
  public async next() {
    await this.nextPage()
    await(await this.nextButton).waitForDisplayed({timeout: 10000, interval: 1000, reverse: true, timeoutMsg: 'Contract might not created'})
  }
}

export {ComplianceFragment, IComplianceFragment}
