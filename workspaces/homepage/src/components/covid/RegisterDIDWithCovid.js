import React, { useState, useEffect, useCallback } from 'react'
import { useTelepath } from 'src/components/telepath'
import { FadingValueBox } from 'src/components/animations'
import { InfoBox, MrSpacer, Blue, Green, Centered } from 'src/components/ui'
import { Button } from 'src/components/forms'

const RegisterDIDWithCovid = ({ onDone, telepathChannel }) => {
  const [currentDid, setCurrentDid] = useState(undefined)
  const [ready, setReady] = useState(false)
  const [telepathProvider, setTelepathProvider] = useState(undefined)

  const requestCurrentDid = useCallback(async () => {
    const message = {
      jsonrpc: '2.0',
      method: 'get_current_identity',
      params: []
    }
    try {
      await telepathChannel.emit(message)
    } catch (e) {
      console.log(e.message)
    }
  }, [telepathChannel])

  const registerDID = useCallback(async did => {
    console.log('registerDID')
    const message = {
      jsonrpc: '2.0',
      servicePath: 'covid-19.authentication-service',
      method: 'register-did',
      params: [{
        did
      }, {
        from: telepathProvider.clientId
      }]
    }
    try {
      await telepathProvider.emit(message, {
        to: telepathProvider.servicePointId
      })
    } catch (e) {
      console.log(e.message)
    }
  }, [telepathProvider])

  const process = useCallback(message => {
    console.log('received message: ', message)
    const { method, params } = message
    if (params && params.length > 0) {
      if (method === 'get_current_identity_response') {
        const { currentDid } = params[0]
        setCurrentDid(currentDid)
        registerDID(currentDid)
      }
    }
  }, [registerDID])

  const onTelepathReady = useCallback(async ({ telepathProvider }) => {
    console.log('idbox telepath is ready!')
    setTelepathProvider(telepathProvider)
  }, [])

  const onMessage = useCallback(message => {
    console.log(message)
    if (message.method === 'register-did-response') {
      setReady(true)
    }
  }, [])

  const onGotIt = useCallback(() => {
    onDone && onDone()
  }, [onDone])

  const onProceed = useCallback(() => {
    requestCurrentDid()
  }, [requestCurrentDid])

  const onError = useCallback(error => {
    console.log(error)
  }, [])

  useTelepath({
    name: 'idbox',
    onTelepathReady: onTelepathReady,
    onMessage,
    onError
  })

  useEffect(() => {
    const subscription = telepathChannel.subscribe(process, error => {
      console.log('error: ', error)
    })
    return () => {
      telepathChannel.unsubscribe(subscription)
    }
  }, [requestCurrentDid, process, telepathChannel])

  if (ready) {
    return (
      <FadingValueBox>
        <Centered>
          <InfoBox>
            The following <Green>DID</Green> has been successfully registered with COVID-19:
          </InfoBox>
          <InfoBox marginTop='15px'>
            <Blue>{currentDid}</Blue>
          </InfoBox>
          <MrSpacer space='50px' />
          <InfoBox>
            Next time you can use this identity to access COVID-19 <Blue>without</Blue> having to use your CODE1 credentials.
          </InfoBox>
          <MrSpacer space='50px' />
          <Button
            onClick={onGotIt}
          >
            Got it!
          </Button>
        </Centered>
      </FadingValueBox>
    )
  } else {
    return (
      <FadingValueBox>
        <Centered>
          <InfoBox>COVID-19 has <Green>successfully</Green> connected to your mobile!</InfoBox>
          <MrSpacer space='50px' />
          <InfoBox>
            Now, it will retrieve your current identity from your mobile app
            and register it with COVID-19.
          </InfoBox>
          <MrSpacer space='50px' />
          <InfoBox>
            Please make sure that your Identity Box IdApp is <Green>open</Green>.
          </InfoBox>
          <MrSpacer space='50px' />
          {telepathProvider &&
            <Button
              onClick={onProceed}
            >
              Proceed!
            </Button>}
        </Centered>
      </FadingValueBox>
    )
  }
}

export { RegisterDIDWithCovid }
