class HomePage {
  get goTo () {
    return {
      main: async () => {
        const link = await $('a[href="/sites/HomeSite"]')
        await link.waitForClickable({timeout: 10000})
        await link.click()
      }
    }
  }
}

export {HomePage}