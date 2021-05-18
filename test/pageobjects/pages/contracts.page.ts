import {step} from '../../../lib'

interface ContractsTable {
  amount: string
  contract_contractor: string
  status: string
}

class ContractsPage {
  private get table() {return $('table.odd-table')}

  @step('Contracts Page get data from table')
  public async getData(): Promise<Array<ContractsTable>> {
    const table = await this.table
    await table.waitForDisplayed()
    const script = `
      const table = arguments[0]
      const headers = table.querySelectorAll('thead th')
      const titles = Array.prototype.map.call(headers, function(item) {
          return item.innerText.replace(/\\n/g, '_').toLowerCase()
      })
      const lines = table.querySelectorAll('tbody tr')

      return Array.prototype.map.call(lines, function(line) {
          const cells = line.querySelectorAll('td')
          return Array.prototype.reduce.call(cells, function(obj, el, index) {
              obj[titles[index]] = el.innerText.replace(/\\n/g, ' ').replace(/(,)/gm, '')
              return obj
          }, {})
      })
    `
    return  browser.execute(script, table)
  }

  @step('Contracts Page opens contract')
  public async openContract(contract: string) {
    const lines = await (await this.table).$$('tbody tr')
    
    for (let i = 0; i < lines.length; i++) {
      const text = await (await lines[i]).getText()
      if (text.includes(contract)) {
      await (await lines[i].$('.tag')).click()
      break
    }
   }
    const tabs = await browser.getWindowHandles()
    await browser.switchToWindow(tabs[1])
  }
}

export {ContractsPage}
