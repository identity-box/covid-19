import React, { useState, useCallback } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { useUnusualReloader } from 'src/hooks'
import { DarkHeader } from 'src/components/header'
import { Box2, DarkFooter } from 'src/content'

import { BodyFrame } from 'src/components/ui-blocks'

const Pros = ({ data, location }) => {
  console.log('Welcome to COVID-19!')

  const onReady = useCallback(() => {
    setTimeout(() => {
      setVisibility('visible')
    }, 100)
  }, [])

  const pageReady = useUnusualReloader(location, onReady)

  const [visibility, setVisibility] = useState('hidden')

  if (!pageReady) {
    return null
  }

  return (
    <>
      <Helmet title='COVID-19 - Care Professionals'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0' />
        <link href='https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap' rel='stylesheet' />
      </Helmet>
      <DarkHeader />
      <BodyFrame css={{ visibility, paddingTop: '100px' }}>
        <Box2 data={data} />
        <DarkFooter data={data} />
      </BodyFrame>
    </>
  )
}

export const query = graphql`
  query {
    allFile(filter: {relativeDirectory: {glob: "**/homepage/src/images"}}) {
      edges {
        node {
          publicURL
          name
        }
      }
    }
  }
`

export default Pros
