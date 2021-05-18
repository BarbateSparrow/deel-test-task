enum Month {
  Jan,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec
}

class Calendar {
  
  constructor(private _root: string) { }

  private get root() {return $(this._root)}
  private get calendar() {return $('.react-calendar')}
  

  private async set(date: string) {
    const [month, day, year] = date.split(' ')

    const root = await this.root
    await (await root.$('.selected')).click()
    const calendar = await this.calendar
    await calendar.waitForDisplayed()

    const currentMonthYear = await (await calendar.$('.react-calendar__navigation__label__labelText--from')).getText()
    const [cMonth, cYear] = currentMonthYear.split(' ')
        
    const mDelta = Month[cMonth] - Month[month]
    const yDelta = +cYear - +year

    let mClicks = Math.abs(mDelta)
    let yClicks = Math.abs(yDelta)

    const prevMonthButton = await calendar.$('button[class*="__prev-button"]')
    const nextMonthButton = await calendar.$('button[class*="__next-button"]')

    const prevYearButton = await calendar.$('button[class*="__prev2-button"]')
    const nextYearButton = await calendar.$('button[class*="__next2-button"]')
    
    do {  
      if (mDelta > 0) await prevMonthButton.click()
      if (mDelta < 0) await nextMonthButton.click() 
      mClicks--
    } while (mClicks > 0)

    do {  
      if (yDelta > 0) await prevYearButton.click() 
      if (yDelta < 0) nextYearButton.click()
      yClicks--
    } while (yClicks > 0)
  
    await(await calendar.$(`abbr=${day}`)).click()
    await calendar.waitForDisplayed({reverse: true})
  }
}

export {Calendar}
