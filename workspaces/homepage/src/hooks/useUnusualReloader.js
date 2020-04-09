import { useState, useEffect } from 'react'

const useUnusualReloader = (location, onReady) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
    onReady && onReady()
  }, [onReady])

  return ready
}

export { useUnusualReloader }
