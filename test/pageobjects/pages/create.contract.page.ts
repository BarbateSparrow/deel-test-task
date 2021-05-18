import { 
  GeneralInfoFragment, IGeneralInfoFragment, PaymentDetailsFragment, 
  IPaymentDetailsFragment, DefineDatesFragment, IDefineDatesFragment, ExtrasFragment, IExtrasFragment, IComplianceFragment, ComplianceFragment
} from '../fragments'
import {step} from '../../../lib'

enum ContractType {
  FIXED_RATE = '/create/fixed',
  MILESTONE = '/create/milestone'
}

class CreateContractPage {
  private _generalInfo: GeneralInfoFragment
  private _paymentDetails: PaymentDetailsFragment
  private _defineDates: DefineDatesFragment
  private _extras: ExtrasFragment
  private _compliance: ComplianceFragment

  constructor() {
    this._generalInfo = new GeneralInfoFragment()
    this._paymentDetails = new PaymentDetailsFragment()
    this._defineDates = new DefineDatesFragment()
    this._extras = new ExtrasFragment()
    this._compliance = new ComplianceFragment()
  }

  @step('Create Contract Page: select Contract Type')
  public async contractType(type: ContractType) {
    await (await $('h1=Contract Type')).waitForDisplayed()
    await (await $(`a[href="${type}"]`)).click()
  }

  public async generalInfo(info: IGeneralInfoFragment) {
    await this._generalInfo.set(info)
    await this._generalInfo.next()
  }

  public async paymentDetails(details: IPaymentDetailsFragment) {
    await this._paymentDetails.set(details)
    await this._paymentDetails.next()
  }

  public async defineDates(dates: IDefineDatesFragment) {
    await this._defineDates.set(dates)
    await this._defineDates.next()
  }

  public async extras(extras: IExtrasFragment) {
    await this._extras.set(extras)
    await this._extras.next()
  }

  public async compliance(data: IComplianceFragment) {
    await this._compliance.set(data)
    await this._compliance.next()
  }
}

export {CreateContractPage, ContractType}
