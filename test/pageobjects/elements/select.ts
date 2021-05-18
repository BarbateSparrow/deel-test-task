class Select {
  
  constructor(private _root: string) {}

  get root() {return $(this._root)}

  private async set(value: string) {
    const root = await this.root
    await(await root.$('.select__indicator')).click()    
    const listSelect = await root.$('.select__menu-list')
    await listSelect.waitForClickable()
    const option = await listSelect.$(`.select__option*=${value}`)
    await option.scrollIntoView(false)
    await option.click()
  }
}

export {Select}
