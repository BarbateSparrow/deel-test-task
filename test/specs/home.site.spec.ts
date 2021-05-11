import {pages} from '../pageobjects'
import {users} from '../../data'

describe('Home Site', () => {
  const {
    loginPage,
    homePage
  } = pages

  it('should redirect to Test task', async () => {
    await loginPage.open()
    await loginPage.login(users.main)
    await homePage.start()

    await expect(browser).toHaveTitle('Test task - Home')
  })

  it('tiles should be animated', async () => {
    await expect(await homePage.isTileAnimated(0)).toBeTruthy()
    await expect(await homePage.isTileAnimated(1)).toBeTruthy()
    // not find how to check animation for third tile
  })
})


