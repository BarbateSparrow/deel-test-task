import {BaseFragment} from './base.fragment'
import {Input, Select} from '../../elements'
import {step} from '../../../../lib'

interface IPaymentDetailsFragment {
  howMuch?: string
  currency?: string
  per?: string
  whatIsMilestone?: string
}

class PaymentDetailsFragment extends BaseFragment {
  private howMuch: Input
  private currency: Select
  private per: Select
  private whatIsMilestone: Input

  constructor() {
    super()
    this.howMuch = new Input('input[name="rate"], .input-with-select')
    this.currency = new Select('[data-qa="currency-select"], [data-qa="selector-undefined"]')
    this.per = new Select('[data-qa="cycle-select"]')
    this.whatIsMilestone = new Input('[placeholder="Social media posts"]')
  }
  

  @step('Payment Details Fragment: set details')
  public async set(details: IPaymentDetailsFragment) {
    for (const key of Object.keys(details)) {
      await this[key].set(details[key])
    }
  }

  @step('Payment Details Fragment: click "Next" button')
  public async next() {
    await this.nextPage()
  }
}

export {PaymentDetailsFragment, IPaymentDetailsFragment}
