import styled from '@emotion/styled'

const MenuLinkExternal = styled.a({
  display: 'inline-block',
  color: 'black',
  fontFamily: 'Roboto Mono, monospace',
  margin: '5px 20px',
  fontSize: '10pt',
  '&:hover': {
    color: '#555',
    textDecoration: 'none'
  }
})

const DarkMenuLinkExternal = styled.a({
  display: 'inline-block',
  color: 'white',
  fontFamily: 'Roboto Mono, monospace',
  margin: '5px 20px',
  fontSize: '10pt',
  '&:hover': {
    color: 'white',
    textDecoration: 'underline'
  }
})

export { MenuLinkExternal, DarkMenuLinkExternal }
