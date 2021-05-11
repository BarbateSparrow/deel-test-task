class HomePage {
  get startButton() {return $('a.shortpoint-btn-simple')}
  get tiles() {return $$('[data-shortpoint-type="tile"]')}
  get visibleSlides() {return $$('div.slick-active')}

  async start() {
    await (await this.startButton).waitForClickable({timeout: 5000})
    await (await this.startButton).click()
    const windows = await browser.getWindowHandles()
    await browser.switchToWindow(windows[1])
  }

  async isTileAnimated(index: number): Promise<Boolean> {
    const tile = (await this.tiles)[index]
    const tileAnimationElement = await tile.$('[class*=transition]')
    const tileBeforeHover = {
      backgroundColor: (await tileAnimationElement.getCSSProperty('backgroundColor')).value,
      location: await tileAnimationElement.getLocation()
    }
    await tile.moveTo({xOffset: 5, yOffset: 5})
    await browser.pause(1000)
    const tileAfterHover = {
      backgroundColor: (await tileAnimationElement.getCSSProperty('backgroundColor')).value,
      location: await tileAnimationElement.getLocation()
    }

    return JSON.stringify(tileBeforeHover) !== JSON.stringify(tileAfterHover)
  }
}

export {HomePage}