import {step} from '../../../lib'

interface IUser {
  email: string
  password: string
}

class LoginPage {

  get email() {return $('input[name="email"]')}
  get password() {return $('input[name="password"]')}
  get loginButton() {return $('.login__content button:not([class*=login-reset-pass-link])')}


  @step('Login')
  async login(user: IUser) {  
    const email = await this.email 
    const password = await this.password
    const lgnButton = await this.loginButton

    await email.clearValue()
    await email.setValue(user.email)
    
    await password.clearValue()
    await password.setValue(user.password)
    
    await lgnButton.click()
  }

  @step('Open browser')
  async open() {
    await browser.maximizeWindow()
    return browser.url('/')
  }

}

export {LoginPage, IUser}
