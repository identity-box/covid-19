import { Authenticator } from './Authenticator'
import { AuthenticatorCP } from './AuthenticatorCP'
import { DIDs } from './DIDs'

class Dispatcher {
  dids
  authenticator
  authenticatorCP

  constructor () {
    this.dids = new DIDs()
    this.authenticator = new Authenticator()
    this.authenticatorCP = new AuthenticatorCP()
  }

  dispatch = ({ method, params }) => {
    console.log('**!!** DISPATCHER **!!**')
    console.log('received:')
    console.log('method:', method)
    console.log('params:', params)
    switch (method) {
      case 'authenticate':
        return this.authenticator.authenticate(params[0])
      case 'get-authenticated-users':
        return this.authenticator.getAuthenticatedUsers()
      case 'authenticate-cp':
        return this.authenticatorCP.authenticate(params[0])
      case 'get-authenticated-cp-users':
        return this.authenticatorCP.getAuthenticatedUsers()
      case 'register-did':
        return this.dids.registerDid(method, params[0].did)
      case 'check-did':
        return this.dids.checkDid(method, params[0].did)
      default:
        return {
          method: 'unknown-method',
          params: []
        }
    }
  }
}

export { Dispatcher }
