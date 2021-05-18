import {pages, fragments} from '../pageobjects'
import {
  Page, IGeneralInfoFragment, IPaymentDetailsFragment,
  IExtrasFragment, IComplianceFragment
} from '../pageobjects/fragments'
import {ContractType} from '../pageobjects/pages'
import {users} from '../../data'
import {expect as expectChai} from 'chai'
import moment from 'moment-es6'
import {makeHash} from '../../lib'

describe('Create Contract', () => {
  const {
    loginPage,
    createContractPage,
    contractsPage,
    contractPage
  } = pages

  const {
    sidebarFragment
  } = fragments


  before(async () => {
    await loginPage.open()
    await loginPage.login(users.individual_client)

  })

  it('fixed rate', async () => {
    const info: IGeneralInfoFragment = {
      contractName: `Voronov Contract ${makeHash(3, true)}`,
      scopeOfWork: `${makeHash(15)}`,
      startDate: moment().subtract(1, 'd').format('MMM D YYYY')
    }

    const details: IPaymentDetailsFragment = {
      howMuch: '1000',
      currency: 'GBP',
      per: 'Week'
    }

    const extras: IExtrasFragment = {
      specialClause: `${makeHash(10)}`
    }

    const compliance: IComplianceFragment = {
      residence: 'United States',
      province: 'Colorado'
    }

    await sidebarFragment.gotTo(Page.CREATE_A_CONTRACT)
    await createContractPage.contractType(ContractType.FIXED_RATE)
    await createContractPage.generalInfo(info)
    await createContractPage.paymentDetails(details)
    await createContractPage.defineDates({})
    await createContractPage.extras(extras)
    await createContractPage.compliance(compliance)

    await sidebarFragment.gotTo(Page.CONTRACTS)
    const data = await contractsPage.getData()
    const contract = data.find(contract => {
      return contract.contract_contractor.includes(info.contractName)
    })

    expectChai(contract.amount).to.includes(details.howMuch)
    expectChai(contract.contract_contractor).to.includes('FIXED')

    await contractsPage.openContract(info.contractName)

    const startDate = await(await contractPage.startDate).getText()
    const rate = await (await contractPage.rate).getText()
    const scope = await(await contractPage.scope).getText()
    const specialClause = await(await contractPage.specialClause).getText()
    const contractCountry = await (await contractPage.contractCountry).getText()

    for(let [index, value] of startDate.split(' ').entries()) {
      await expectChai(value).to.contains(info.startDate.split(' ')[index])
    }

    expectChai(rate.replace(',', '')).to.contains(details.howMuch)
    expectChai(scope).equals(info.scopeOfWork, 'Scope is wrong')
    expectChai(specialClause).contains(extras.specialClause, 'Special Clause is wrong')
    expectChai(contractCountry)
      .contains(compliance.residence, 'Residance is wrong')
      .and.contains(compliance.province, 'Province is wrong')
  })
})
