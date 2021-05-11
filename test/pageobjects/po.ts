import {
  LoginPage,
  HomePage
} from './pages'

import {MainFragment} from './fragments'


const pages = {
  loginPage: new LoginPage(),
  homePage: new HomePage()
}

const fragments = {
  homePage: {
    mainFragment: new MainFragment()
  }
}

export {pages, fragments}