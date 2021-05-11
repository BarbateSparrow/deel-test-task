import {pages, fragments} from '../pageobjects'
import {users} from '../../data'
import {expect as expectChai} from 'chai'

describe('Home Site', () => {
  const {
    loginPage,
    homePage
  } = pages

  const {
    homePage: {
      mainFragment
    }
  } = fragments


  before(async () => {
    await loginPage.open()
    await loginPage.login(users.main)
    await homePage.goTo.main()
  })

  it('should redirect to Test task', async () => {
    await mainFragment.start()

    await expect(browser).toHaveTitle('Test task - Home')
  })

  it('slideshow animation should work', async () => {
    const slides = await mainFragment.getSlides()
    await expectChai(slides).length(4)
  })

  it('tiles should be animated', async () => {
    const tiles = await mainFragment.tilesCount()

    for (let i = 0 ; i < tiles; i++) {
      const isAnimated = await mainFragment.isTileAnimated(i)  
      await expectChai(isAnimated, `Tile with index ${i} should be animated`).to.be.true
    }
  })
})


