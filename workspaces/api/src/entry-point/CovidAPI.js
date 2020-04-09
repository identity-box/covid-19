import { CovidAPIService } from '../services'
import { ServiceProxy, StateSerializer } from '@identity-box/utils'

import path from 'path'

class Dispatcher {
  dids = []
  stateSerializer

  constructor ({ serializerFilePath } = {}) {
    const filePath = serializerFilePath || path.resolve(process.cwd(), 'DIDs.json')
    this.stateSerializer = new StateSerializer(filePath)
    this.dids = this.stateSerializer.read() || []
  }

  isRegistred = did => {
    return this.dids.includes(did)
  }

  authenticateCODE1 = (method, { userName, userPassword }) => {
    return {
      method: `${method}-response`,
      params: []
    }
  }

  registerDid = (method, did) => {
    if (!this.isRegistred(did)) {
      this.dids.push(did)
      this.stateSerializer.write(this.dids)
    }
    return {
      method: `${method}-response`,
      params: []
    }
  }

  checkDid = (method, did) => {
    return {
      method: `${method}-response`,
      params: [
        { status: this.isRegistred(did) }
      ]
    }
  }

  dispatch = ({ method, params }) => {
    console.log('**!!** DISPATCHER **!!**')
    console.log('received:')
    console.log('method:', method)
    console.log('params:', params)
    switch (method) {
      case 'authenticate-code1':
        return this.authenticateCODE1(method, params[0])
      case 'register-did':
        return this.registerDid(method, params[0].did)
      case 'check-did':
        return this.checkDid(method, params[0].did)
      default:
        return {
          method: 'unknown-method',
          params: []
        }
    }
  }
}

class CovidAPI {
  covidAPIService
  servicePath

  constructor ({ servicePath, registrationPath }) {
    this.servicePath = servicePath
    this.registrationPath = registrationPath
  }

  validateRegistrationResponse = response => {
    return (
      response.method === 'register-response' &&
      response.params.length === 1 &&
      response.params[0].servicePath === this.servicePath
    )
  }

  register = () => {
    const registrationRequest = {
      method: 'register',
      params: [
        { servicePath: this.servicePath }
      ]
    }
    const serviceProxy = new ServiceProxy(this.registrationPath)
    return serviceProxy.send(registrationRequest)
  }

  start = async () => {
    const dispatcher = new Dispatcher()
    this.covidAPIService = await CovidAPIService.create({
      servicePath: this.servicePath,
      dispatcher
    })
    if (this.registrationPath) {
      const { response } = await this.register()

      if (this.validateRegistrationResponse(response)) {
        console.log('registration successful')
      } else {
        console.log('registration failed!')
        console.log('received:')
        console.log(JSON.stringify(response))
      }
    }
  }

  stop = () => {
    this.covidAPIService.stop()
  }
}

export { CovidAPI }
