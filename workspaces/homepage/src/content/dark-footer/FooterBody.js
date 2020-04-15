import React from 'react'
import Media from 'react-media'
import { getImage } from 'src/assets'
import { MenuLink } from 'src/components/ui-blocks'

import { FooterRow } from './FooterRow'
import { FooterMenu } from './FooterMenu'
import { FooterGraphic } from './FooterGraphic'

const FooterBody = ({ data }) => (
  <FooterRow css={{
    '@media (min-width: 568px)': {
      alignSelf: 'flex-start',
      marginLeft: '55px'
    }
  }}
  >
    <FooterMenu
      title='COVID-19' css={{
        alignSelf: 'flex-start'
      }}
    >
      <MenuLink to='/welcome-to-covid-19'>About</MenuLink>
    </FooterMenu>
    <FooterMenu
      title='Documentation' css={{
        alignSelf: 'flex-start',
        '@media (min-width: 568px)': {
          marginLeft: '80px'
        }
      }}
    >
      <MenuLink to='/services/covid-19-api'>Services</MenuLink>
      <MenuLink to='/developers/contributing'>Contributing</MenuLink>
    </FooterMenu>
    <Media
      query='(min-width: 800px)' render={() => (
        <FooterGraphic imageUrl={getImage(data, 'CovidFooterGraphic')} />
      )}
    />
  </FooterRow>
)

export { FooterBody }
