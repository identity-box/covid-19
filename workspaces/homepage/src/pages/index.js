import React, { useState, useCallback } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { useUnusualReloader } from 'src/hooks'
import { Header } from 'src/components/header'
import { Box1, Footer } from 'src/content'

import { BodyFrame } from 'src/components/ui-blocks'

const Home = ({ data, location }) => {
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
      <Helmet title='COVID-19'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0' />
        <link href='https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap' rel='stylesheet' />
      </Helmet>
      <Header />
      <BodyFrame css={{ visibility, paddingTop: '100px' }}>
        <Box1 data={data} />
        <Footer data={data} />
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

export default Home
