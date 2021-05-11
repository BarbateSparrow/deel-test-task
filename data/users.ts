import {IUser} from '../test/pageobjects/pages'

type ExistingUsers = 'main' 

type Users = {
  [T in ExistingUsers]: IUser
}

const users: Users = {
  main: {
    email: 'sptestautomation@antongshortpoint.onmicrosoft.com',
    password: '7310413Anton'
  }
}

export {users}