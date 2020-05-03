import React, { useState, useCallback } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { useTelepath } from 'src/components/telepath'
import { FadingValueBox } from 'src/components/animations'
import { InfoBox, MrSpacer, Blue, Centered } from 'src/components/ui'
import { NoRegistredPatients } from './NoRegistredPatients'

const CreateCovidAttestation = () => {
  const [user, setUser] = useState('')
  // const [telepathProvider, setTelepathProvider] = useState(undefined)
  const [authenticatedUsers, setAuthenticatedUsers] = useState([])

  const getAuthenticatedUsers = useCallback(async telepathProvider => {
    console.log('getAuthenticatedUsers')
    const message = {
      jsonrpc: '2.0',
      servicePath: 'covid-19.authentication-service',
      method: 'get-authenticated-users',
      params: [
        {},
        {
          from: telepathProvider.clientId
        }
      ]
    }
    try {
      await telepathProvider.emit(message, {
        to: telepathProvider.servicePointId
      })
    } catch (e) {
      console.log(e.message)
    }
  }, [])

  const handleChange = useCallback((e, { value }) => {
    setUser(value)
  }, [])

  const onTelepathReady = useCallback(async ({ telepathProvider }) => {
    // setTelepathProvider(telepathProvider)
    getAuthenticatedUsers(telepathProvider)
  }, [getAuthenticatedUsers])

  const onMessage = useCallback(message => {
    console.log(message)
    if (message.method === 'get-authenticated-users-response') {
      if (message.params && message.params.length > 0) {
        const { authenticatedUsers: au } = message.params[0]
        const entries = au.map((user, i) => {
          return {
            key: i,
            text: user,
            value: user
          }
        })
        console.log('entries:', entries)
        setAuthenticatedUsers(entries)
      }
    }
  }, [])

  const onError = useCallback(error => {
    console.log(error)
  }, [])

  useTelepath({
    name: 'idbox',
    onTelepathReady: onTelepathReady,
    onMessage,
    onError
  })

  if (authenticatedUsers.length === 0) {
    return (
      <NoRegistredPatients />
    )
  }

  return (
    <FadingValueBox>
      <Centered>
        <MrSpacer space='50px' />
        <InfoBox>Let's create <Blue>COVID-19</Blue> attestation here!</InfoBox>
        <MrSpacer space='50px' />
        <Dropdown
          onChange={handleChange}
          options={authenticatedUsers}
          placeholder='Choose a patient'
          selection
          value={user}
        />
      </Centered>
    </FadingValueBox>
  )
}

export { CreateCovidAttestation }
