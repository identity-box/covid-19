import { CovidAPI } from '../../src/entry-point'
import { ServiceProxy, Service } from '@identity-box/utils'

import nacl from 'tweetnacl'
import base64url from 'base64url'

describe('CovidAPI', () => {
  const rpcRequest = {
    method: 'test-method'
  }

  let servicePath
  let registrationPath
  let covidAPI
  let registrationService

  const prepareServicePath = () => {
    const serviceId = base64url.encode(nacl.hash(nacl.randomBytes(10)))
    servicePath = `covid-api-service.${serviceId}`
  }

  const prepareRegistrationPath = () => {
    const serviceId = base64url.encode(nacl.hash(nacl.randomBytes(10)))
    registrationPath = `covid-api-service.${serviceId}`
  }

  beforeEach(() => {
    prepareServicePath()
    console.log = jest.fn()
  })

  afterEach(() => {
    covidAPI.stop()
    registrationService && registrationService.stop()
    console.log.mockRestore()
  })

  it('works', async () => {
    const expectedResponse = {
      method: 'unknown-method',
      params: []
    }
    covidAPI = new CovidAPI({ servicePath })

    await covidAPI.start()

    const serviceProxy = new ServiceProxy(servicePath)
    const { response } = await serviceProxy.send(rpcRequest)

    expect(response).toEqual(expectedResponse)
  })

  it('registers to the provided registration service', async () => {
    prepareRegistrationPath()
    const expectedRegistrationResponse = {
      method: 'register-response',
      params: [
        { servicePath }
      ]
    }
    registrationService = await Service.create({
      servicePath: registrationPath,
      onMessage: jest.fn().mockReturnValue(expectedRegistrationResponse)
    })

    covidAPI = new CovidAPI({
      servicePath,
      registrationPath
    })

    await covidAPI.start()

    expect(console.log).toHaveBeenCalledWith('registration successful')
  })

  it('prints received response on registration failure', async () => {
    prepareRegistrationPath()
    const expectedRegistrationResponse = {
      method: 'register-error',
      params: [
        { servicePath }
      ]
    }
    registrationService = await Service.create({
      servicePath: registrationPath,
      onMessage: jest.fn().mockReturnValue(expectedRegistrationResponse)
    })

    covidAPI = new CovidAPI({
      servicePath,
      registrationPath
    })

    await covidAPI.start()

    expect(console.log).toHaveBeenNthCalledWith(1, 'registration failed!')
    expect(console.log).toHaveBeenNthCalledWith(2, 'received:')
    expect(console.log).toHaveBeenNthCalledWith(3, JSON.stringify(expectedRegistrationResponse))
  })
})
