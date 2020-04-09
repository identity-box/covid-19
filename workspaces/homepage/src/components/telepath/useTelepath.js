import { useEffect, useRef, useCallback } from 'react'
import { MultiTelepathProvider } from './MultiTelepathProvider'
import { MultiTelepathConfiguration } from './MultiTelepathConfiguration'

const useTelepath = ({
  name,
  transient,
  reset,
  channelDescription,
  onMessage,
  onError,
  onTelepathReady
} = {}, deps = []) => {
  const telepathProvider = useRef(undefined)
  const subscription = useRef(undefined)

  const subscribe = useCallback(async () => {
    try {
      if (reset) {
        MultiTelepathConfiguration.reset(name)
      }
      telepathProvider.current = MultiTelepathProvider.instance(name, transient)
      if (!telepathProvider.current.connected || channelDescription) {
        await telepathProvider.current.connect(channelDescription)
      }
      if (onMessage) {
        console.log('subscribing...')
        subscription.current = telepathProvider.current.subscribe(onMessage, onError)
        console.log('ok')
      }
      onTelepathReady && onTelepathReady({ telepathProvider: telepathProvider.current })
    } catch (e) {
      console.log(e.message)
      onError && onError(e)
    }
  // eslint-disable-next-line
  }, [name, transient, reset, channelDescription, onMessage, onError, onTelepathReady]) // eslint-disable-line

  const unsubscribe = () => {
    if (telepathProvider.current && subscription.current !== undefined) {
      console.log('unsubscribing...')
      telepathProvider.current.unsubscribe(subscription.current)
    }
  }

  useEffect(() => {
    if (name) {
      subscribe()
    }
    return () => {
      unsubscribe()
    }
  }, [name, subscribe])

  return telepathProvider.current
}

export { useTelepath }
