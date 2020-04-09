import React, { useState, useEffect, useCallback } from 'react'
import { useTelepath } from 'src/components/telepath'
import { FadingValueBox } from 'src/components/animations'
import { InfoBox, MrSpacer, Blue, Green, Centered } from 'src/components/ui'
import { Button } from 'src/components/forms'

const LoginWithIdentityBox = ({ onDone, telepathChannel }) => {
  const [currentDid, setCurrentDid] = useState(undefined)
  const [success, setSuccess] = useState(false)
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

  const checkDID = useCallback(async did => {
    console.log('checkDID')
    const message = {
      jsonrpc: '2.0',
      servicePath: 'covid-19.authentication-service',
      method: 'check-did',
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
        checkDID(currentDid)
      }
    }
  }, [checkDID])

  const onTelepathReady = useCallback(async ({ telepathProvider }) => {
    setTelepathProvider(telepathProvider)
  }, [])

  const onMessage = useCallback(message => {
    console.log(message)
    if (message.method === 'check-did-response') {
      let status = false
      if (message.params && message.params.length > 0) {
        status = message.params[0].status
      }
      if (status) {
        setSuccess(status)
      } else {
        onDone && onDone(status)
      }
    }
  }, [onDone])

  const onContinue = useCallback(() => {
    onDone && onDone(success)
  }, [onDone, success])

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

  if (success) {
    return (
      <FadingValueBox>
        <Centered>
          <InfoBox>
            Successfully Authenticated with COVID-19 using <Green>DID</Green>:
          </InfoBox>
          <InfoBox marginTop='15px'>
            <Blue>{currentDid}</Blue>
          </InfoBox>
          <MrSpacer space='50px' />
          <Button
            onClick={onContinue}
          >
            Continue!
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
            Now, it will retrieve your current identity from your Identity App
            and try to authenticate with COVID-19 using this identity.
          </InfoBox>
          <MrSpacer space='50px' />
          <InfoBox>
            Please keep your Identity App <Green>open</Green>.
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

export { LoginWithIdentityBox }
