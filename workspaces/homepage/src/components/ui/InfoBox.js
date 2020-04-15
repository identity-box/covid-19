import React from 'react'

const InfoBox = ({ children, marginTop = 0, marginBottom = 0, color = '#555' }) => {
  return (
    <div css={{
      textAlign: 'center',
      marginTop,
      marginBottom,
      color
    }}
    >{children}
    </div>
  )
}

export { InfoBox }
