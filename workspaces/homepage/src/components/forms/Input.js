import styled from '@emotion/styled'

const Input = styled.input({
  fontFamily: '"Roboto Mono", monospace',
  fontSize: '0.9rem',
  width: '100%',
  backgroundColor: 'white',
  color: 'black',
  borderRadius: '20px',
  border: '1px solid #0099FF',
  padding: '15px',
  resize: 'none',
  outline: 'none',
  transition: 'border-color 0.2s ease-in-out 0s',
  ':focus': {
    borderColor: '#ff7200',
    outline: 'none'
  },
  '::selection': {
    backgroundColor: 'white'
  }
})

const DarkInput = styled.input({
  fontFamily: '"Roboto Mono", monospace',
  fontSize: '0.9rem',
  lineHeight: '0.9rem',
  width: '100%',
  backgroundColor: 'black',
  color: 'white',
  borderRadius: '20px',
  border: '1px solid black',
  padding: '15px',
  resize: 'none',
  outline: 'none',
  transition: 'all 0.2s ease-in-out 0s',
  ':focus': {
    borderColor: '#092C3E',
    backgroundColor: '#092C3E',
    outline: 'none'
  },
  '::selection': {
    backgroundColor: 'white'
  }
})

export { Input, DarkInput }
