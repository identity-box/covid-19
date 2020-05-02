import { Authenticator } from './Authenticator'
import { DIDs } from './DIDs'

class Dispatcher {
  dids
  authenticator

  constructor () {
    this.dids = new DIDs()
    this.authenticator = new Authenticator()
  }

  dispatch = ({ method, params }) => {
    console.log('**!!** DISPATCHER **!!**')
    console.log('received:')
    console.log('method:', method)
    console.log('params:', params)
    switch (method) {
      case 'authenticate-code1':
        return this.authenticator.authenticate(params[0])
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
