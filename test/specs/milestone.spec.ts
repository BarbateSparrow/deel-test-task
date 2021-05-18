import {pages, fragments} from '../pageobjects'
import {
  Page, IGeneralInfoFragment, IPaymentDetailsFragment, 
  IComplianceFragment
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

  it('milestone', async () => {
    const info: IGeneralInfoFragment = {
      contractName: `Contract ${makeHash(3, true)}`,
      scopeOfWork: `${makeHash(15)}`,
      startDate: moment().add(5, 'd').format('MMM D YYYY')
    }

    const details: IPaymentDetailsFragment = {
      howMuch: '13',
      whatIsMilestone: `${makeHash(7)}`,
      currency: 'CHF'
    }

    const compliance: IComplianceFragment = {
      residence: 'Albania'
    }

    await sidebarFragment.gotTo(Page.CREATE_A_CONTRACT)
    await createContractPage.contractType(ContractType.MILESTONE)
    await createContractPage.generalInfo(info)
    await createContractPage.paymentDetails(details)
    await createContractPage.extras({})
    await createContractPage.compliance(compliance)

    const rate = await (await contractPage.rate).getText()
    const scope = await(await contractPage.scope).getText()
    const contractCountry = await (await contractPage.contractCountry).getText()

    expectChai(rate).to.contains(details.howMuch)
    expectChai(scope).equals(info.scopeOfWork, 'Scope is wrong')
    expectChai(contractCountry).equals(compliance.residence, 'Residance is wrong')
    
    await sidebarFragment.gotTo(Page.CONTRACTS)
    const data = await contractsPage.getData()
    const contract = data.find(contract => {
      return contract.contract_contractor.includes(info.contractName)
    })

    expectChai(contract.amount).to.includes(details.howMuch)
    expectChai(contract.contract_contractor).to.includes('MILESTONES')
  })
})
