// import styled from '@emotion/styled'
import React from 'react'

const Button = ({ type, children, disabled, onClick, marginLeft }) => (
  <input
    type='button'
    value={React.Children.toArray(children)[0]}
    disabled={disabled}
    onClick={onClick}
    css={{
      cursor: 'pointer',
      fontFamily: '"Roboto Mono", monospace',
      fontSize: '0.8em',
      backgroundColor: 'transparent',
      color: 'white',
      alignSelf: 'center',
      marginTop: '0px',
      marginLeft: marginLeft || '0px',
      borderRadius: '10px',
      borderColor: 'white',
      outline: 0,
      opacity: '1.0',
      boxShadow: 'none',
      padding: '10px',
      border: '1px solid white',
      transition: 'all 0.2s ease-in-out 0s',
      '&:active': {
        opacity: '1.0',
        borderWidth: '3px',
        borderColor: 'white',
        border: '1px solid white'
      },
      '&:disabled': {
        cursor: 'not-allowed',
        color: '#aaa',
        borderColor: '#aaa'
      },
      '&:hover': {
        filter: disabled ? 'none' : 'brightness(85%)'
      }
    }}
  />
)

// const Button = styled.input(props => ({
//   fontFamily: '"Roboto Mono", monospace',
//   fontSize: '0.8em',
//   backgroundColor: 'transparent',
//   color: props.disabled ? 'grey' : 'white',
//   alignSelf: 'center',
//   marginTop: '20px',
//   borderRadius: '10px',
//   borderColor: 'white',
//   outline: 0,
//   opacity: '1.0',
//   boxShadow: 'none',
//   padding: '15px',
//   border: '1px solid white',
//   transition: 'all 0.2s ease-in-out 0s',
//   '&:active': {
//     opacity: '1.0',
//     borderWidth: '3px',
//     borderColor: 'white',
//     border: '1px solid #dddddd'
//   },
//   '&:hover': {
//     filter: props.disabled ? 'none' : 'brightness(85%)'
//   }
// }))

export { Button }
