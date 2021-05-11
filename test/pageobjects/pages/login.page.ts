interface IUser {
  email: string
  password: string
}

class LoginPage {
  get email() {return $('input[name="loginfmt"]')}
  get password() {return $('input[name="passwd"]')}
  get next() {return $('#idSIButton9')}
  get no() {return $('#idBtn_Back')}

  async login(user: IUser) {
    await (await this.email).setValue(user.email)
    await (await this.next).waitForClickable()
    await (await this.next).click()
    await (await this.password).setValue(user.password)
    await (await this.next).waitForClickable()
    await (await this.next).click()
    await (await this.no).waitForClickable()
    await (await this.no).click()
  }

  async open() {
    await browser.maximizeWindow()
    return browser.url(`https://antongshortpoint.sharepoint.com/sites/HomeSite`)
  }

}

export {LoginPage, IUser}
