import {
  LoginPage,
  CreateContractPage,
  ContractsPage,
  ContractPage
} from './pages'

import {SidebarFragment} from './fragments'

const pages = {
  loginPage: new LoginPage(),
  createContractPage: new CreateContractPage(),
  contractsPage: new ContractsPage(),
  contractPage: new ContractPage()
}

const fragments = {
  sidebarFragment: new SidebarFragment()
}

export {pages, fragments}
