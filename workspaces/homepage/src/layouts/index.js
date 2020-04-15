import { React } from 'react'
import { withPrefix } from 'gatsby'

import Layout from '@confluenza/gatsby-theme-confluenza/src/layouts'

import Home from '@confluenza/gatsby-theme-confluenza/src/components/home'

const CovidLayout = ({ location, children }) => {
  if (location.pathname === withPrefix('/pros')) {
    return (
      <Home>
        {children}
      </Home>
    )
  } else {
    return (
      <Layout location={location} children={children} />
    )
  }
}

export default CovidLayout
