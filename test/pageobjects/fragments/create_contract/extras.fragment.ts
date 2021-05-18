import {BaseFragment} from './base.fragment'
import {step} from '../../../../lib'
import {Input} from '../../elements'

enum Opportunities {
  specialClause = 'add a special clause'
}
interface IExtrasFragment {
  specialClause?: string
}

class ExtrasFragment extends BaseFragment {
  protected specialClause: Input

  constructor() {
    super()
    this.specialClause = new Input('textarea')
  }

  @step('Extras Fragment: set data')
  public async set(extras: IExtrasFragment) {
    for (const key of Object.keys(extras)) {
      await (await $(`div=${Opportunities.specialClause}`)).click()
      await this[key].set(extras[key])
    }
  }

  @step('Extras: click "Next" button')
  public async next() {
    await this.nextPage()
  }
}

export {ExtrasFragment, IExtrasFragment}
