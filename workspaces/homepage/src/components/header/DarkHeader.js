import React from 'react'
import styled from '@emotion/styled'
import { navigate } from 'gatsby'
import headerLogo from 'src/images/CovidFooterGraphic.png'

import { DarkMenuLinkExternal } from 'src/components/ui-blocks'

const Logo = styled.div({
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  margin: '20px'
})

const LogoImg = styled.img({
  margin: 0
})

const LogoText = styled.p({
  display: 'inline-block',
  margin: 0,
  color: 'white',
  fontFamily: 'Roboto Mono, monospace',
  fontSize: '10pt',
  marginLeft: '20px',
  whiteSpace: 'nowrap'
})

const Menu = styled.div({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-end',
  alignItems: 'center'
})

const HyperWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  zIndex: 0,
  width: '100%',
  backgroundImage: 'linear-gradient(#000000, #092C3E)',
  opacity: 1
})

const Wrapper = styled.div({
  width: '100%',
  maxWidth: '1200px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between'
})

const DarkHeader = () => (
  <HyperWrapper>
    <Wrapper>
      <Logo
        onClick={() => navigate('/')}
        css={{ cursor: 'pointer' }}
      >
        <LogoImg alt='IdBox logo' src={headerLogo} width='52px' />
        <LogoText>COVID-19</LogoText>
      </Logo>
      <Menu>
        <DarkMenuLinkExternal href='https://github.com/identity-box/covid-19' target='_blank'>Github</DarkMenuLinkExternal>
        {/* <MenuLinkExternal href='https://twitter.com/covid-19-identity-box' target='_blank'>Twitter</MenuLinkExternal> */}
        {/* <MenuLink
        css={{
          margin: '5px 20px'
        }} to='/developers/contributing' target='_blank'
      >Blog
      </MenuLink> */}
      </Menu>
    </Wrapper>
  </HyperWrapper>
)

export { DarkHeader }
