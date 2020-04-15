import styled from '@emotion/styled'
import { Link } from 'gatsby'

const MenuLink = styled(Link)({
  display: 'inline-block',
  color: 'black',
  fontFamily: 'Roboto Mono, monospace',
  fontSize: '10pt',
  '&:hover': {
    color: '#555',
    textDecoration: 'none'
  }
})

const DarkMenuLink = styled(Link)({
  display: 'inline-block',
  color: 'white',
  fontFamily: 'Roboto Mono, monospace',
  fontSize: '10pt',
  '&:hover': {
    color: 'white',
    textDecoration: 'underline'
  }
})

export { MenuLink, DarkMenuLink }
