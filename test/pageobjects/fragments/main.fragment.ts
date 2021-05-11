class MainFragment {
  get startButton() {return $('a.shortpoint-btn-simple')}
  get tiles() {return $$('[data-shortpoint-type="tile"]')}
  get visibleSlides() {return $$('div.slick-active')}

  async start() {
    await (await this.startButton).waitForClickable({timeout: 10000})
    await (await this.startButton).click()
    const windows = await browser.getWindowHandles()
    await browser.switchToWindow(windows[1])
  }

  async tilesCount() {
    return (await this.tiles).length
  }

  async getSlides(): Promise<String[]> {
    const slides = []
    let flag = true

    do {
      const slidesPosition = (await (await $('.slick-track')).getCSSProperty('transform')).value


      const _slides = await (await $$('div.slick-active .shortpoint-image-carousel-title-inner'))
      for (let s of _slides) {
        const slideText = await (await s).getText()

        if (slides.indexOf(slideText) === -1) {
          slides.push(slideText)
        } else {
          flag = false
        }
      }
      await (await $('.slick-track')).waitUntil(async () => {
        return slidesPosition !== (await (await $('.slick-track')).getCSSProperty('transform')).value
      }, {timeout: 30000, interval: 1000})
    } while (flag)
    return slides
  }

  async isTileAnimated(index: number): Promise<Boolean> {
    const tile = (await this.tiles)[index]
    await tile.scrollIntoView(false)
    const tileAnimationElement = await tile.$('[class*=transition]')

    const tileBeforeHover = {
      backgroundColor: (await tileAnimationElement.getCSSProperty('backgroundColor')).value,
      titleLocation: await (await tileAnimationElement.$('.shortpoint-tile-title')).getLocation()
    }
    await tile.moveTo({xOffset: 5, yOffset: 5})
    await browser.pause(1000)
    const tileAfterHover = {
      backgroundColor: (await tileAnimationElement.getCSSProperty('backgroundColor')).value,
      titleLocation: await (await tileAnimationElement.$('.shortpoint-tile-title')).getLocation()
    }

    return JSON.stringify(tileBeforeHover) !== JSON.stringify(tileAfterHover)
  }
}

export {MainFragment}