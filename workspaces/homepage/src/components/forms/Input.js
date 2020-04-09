import styled from '@emotion/styled'

const Input = styled.input({
  fontFamily: '"Roboto Mono", monospace',
  fontSize: '0.9rem',
  width: '100%',
  backgroundColor: 'black',
  color: 'white',
  borderRadius: '20px',
  border: '1px solid white',
  padding: '15px',
  resize: 'none',
  outline: 'none',
  transition: 'border-color 0.2s ease-in-out 0s',
  ':focus': {
    borderColor: '#ceaa00',
    outline: 'none'
  },
  '::selection': {
    backgroundColor: 'white'
  }
})

export { Input }
