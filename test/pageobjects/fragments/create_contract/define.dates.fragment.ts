import {BaseFragment} from './base.fragment'
import {step} from '../../../../lib'

interface IDefineDatesFragment {

}

class DefineDatesFragment extends BaseFragment {

  @step('Define Dates Fragment: set data')
  public async set(dates: IDefineDatesFragment) {
    for (const key of Object.keys(dates)) {
      await this[key].set(dates[key])
    }
  }

  @step('Define Dates Fragment: click "Next" button')
  public async next() {
    await this.nextPage()
  }
}

export {DefineDatesFragment, IDefineDatesFragment}
