import {IUser} from '../test/pageobjects/pages'

type ExistingUsers = 'individual_client' 

type Users = {
  [T in ExistingUsers]: IUser
}

const users: Users = {
  individual_client: {
    email: 'dima.voronov2008@gmail.com',
    password: 'returnoftheJedi6'
  }
}

export {users}