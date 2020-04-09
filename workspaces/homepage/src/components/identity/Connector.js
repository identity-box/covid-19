import React, { useState, useEffect, useCallback } from 'react'
import { Telepath } from '@identity-box/telepath'
import { IdAppConnector } from '@identity-box/idbox-react-ui'
import nacl from 'tweetnacl'
import base64url from 'base64url'

const Connector = ({
  onDone = () => {},
  title,
  disabled
}) => {
  const [open, setOpen] = useState(false)
  const [telepathChannel, setTelepathChannel] = useState(null)

  const getConnectUrl = () => {
    return telepathChannel.createConnectUrl('https://idbox.online')
  }

  const createRandomId = () => {
    const idSize = 18
    const idBytes = nacl.randomBytes(idSize)
    return base64url.encode(idBytes)
  }

  const createRandomKey = () => {
    return nacl.randomBytes(nacl.secretbox.keyLength)
  }

  const createRandomClientId = () => {
    return base64url.encode(nacl.randomBytes(8))
  }

  const createChannel = useCallback(async () => {
    const telepath = new Telepath({
      serviceUrl: process.env.GATSBY_serviceUrl
    })
    const telepathChannel = await telepath.createChannel({
      id: createRandomId(),
      key: createRandomKey(),
      appName: 'COVID-19',
      clientId: createRandomClientId()
    })
    await telepathChannel.connect()
    setTelepathChannel(telepathChannel)
  }, [])

  useEffect(() => {
    createChannel()
  }, [createChannel])

  if (!telepathChannel) return null
  return (
    <div css={{ alignSelf: 'center' }}>
      <IdAppConnector
        open={open}
        telepathChannel={telepathChannel}
        buttonText={title}
        buttonDisabled={disabled}
        buttonStyling={{ primary: true }}
        connectUrl={getConnectUrl()}
        onOpen={() => setOpen(true)}
        onDone={() => {
          setOpen(false)
          onDone(telepathChannel)
        }}
        onCancel={() => setOpen(false)}
      />
    </div>
  )
}

export { Connector }
