class Input {

  constructor(private _root: string) {}

  get root() {return $(this._root)}

  private async set(value: string) {
    const element = await this.root
    await element.clearValue()
    await element.setValue(value)
  }
}

export {Input}
