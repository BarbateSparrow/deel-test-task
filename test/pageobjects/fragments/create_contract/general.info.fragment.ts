import {Calendar, Input} from '../../elements'
import {BaseFragment} from './base.fragment'
import {step} from '../../../../lib'

interface IGeneralInfoFragment {
  contractName?: string
  scopeOfWork?: string
  startDate?: string
}

class GeneralInfoFragment extends BaseFragment  {
  private contractName: Input
  private scopeOfWork: Input
  private startDate: Calendar

  constructor() {
    super ()
    this.contractName = new Input('input[name="name"]')
    this.scopeOfWork = new Input('textarea')
    this.startDate = new Calendar('.row .input-container')
  }

  @step('General Info Fragment: set data')
  public async set(info: IGeneralInfoFragment) {
    for (const key of Object.keys(info)) {
      await this[key].set(info[key])
    }
  }

  @step('General Info Fragment: click "Next" button')
  public async next() {
    await this.nextPage()
  }
}

export {GeneralInfoFragment, IGeneralInfoFragment}
