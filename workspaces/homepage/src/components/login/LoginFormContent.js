import React, { useCallback, useState } from 'react'
import { useTelepath } from 'src/components/telepath'
import { FadingValueBox } from 'src/components/animations'
import { Form, Button } from 'src/components/forms'
import { UserName } from './UserName'
import { UserPassword } from './UserPassword'
import { Wrapper } from './ui'
import { InfoBox, Red, Blue, MrSpacer } from 'src/components/ui'

const LoginFormContent = ({ data, onLoggedIn }) => {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [telepathProvider, setTelepathProvider] = useState(undefined)

  const authenticate = useCallback(async () => {
    const message = {
      jsonrpc: '2.0',
      servicePath: 'covid-19.authentication-service',
      method: 'authenticate-code1',
      params: [{
        userName,
        userPassword
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
  }, [userName, userPassword, telepathProvider])

  const onSubmit = useCallback(event => {
    event.preventDefault()
    console.log('userName=', userName)
    console.log('userPassword=', userPassword)
    authenticate()
  }, [userName, userPassword, authenticate])

  const onTelepathReady = useCallback(async ({ telepathProvider }) => {
    setTelepathProvider(telepathProvider)
  }, [])

  const onMessage = useCallback(message => {
    console.log(message)
    if (message.method === 'authenticate-code1-response') {
      onLoggedIn && onLoggedIn()
    }
  }, [onLoggedIn])

  const onError = useCallback(error => {
    console.log(error)
  }, [])

  useTelepath({
    name: 'idbox',
    onTelepathReady: onTelepathReady,
    onMessage,
    onError
  })

  return (
    <FadingValueBox alignItems='center'>
      <Wrapper>
        <InfoBox>
          <Red>
            This is demonstration software.
          </Red>
        </InfoBox>
        <InfoBox>
          <Red>
            DO NOT USE REAL USER NAMES AND PASSWORDS!!!
          </Red>
        </InfoBox>
        <MrSpacer space='50px' />
        <InfoBox>Use your <Blue>|</Blue>hospital<Blue>|</Blue> credentials to login in:</InfoBox>
        <MrSpacer space='50px' />
        <Form onSubmit={onSubmit}>
          <UserName onUserNameChanged={userName => setUserName(userName)} />
          <UserPassword onUserPasswordChanged={userPassword => setUserPassword(userPassword)} />
          <div css={{ alignSelf: 'center', marginTop: '1rem' }}>
            <Button
              disabled={userName === '' || userPassword === ''}
              onClick={onSubmit}
            >
            Send...
            </Button>
          </div>
        </Form>
      </Wrapper>
    </FadingValueBox>
  )
}

export { LoginFormContent }
