import { React } from 'react'
import styled from '@emotion/styled'
import { Global } from '@emotion/core'
// import 'semantic-ui-css/semantic.min.css'
// we need to get rid some of the semantic global styles as this has impact on confluenza
import './semantic.css'

const Wrapper = styled.div({
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  backgroundColor: 'white'
})

const Home = ({ children }) => (
  <Wrapper>
    <Global styles={{
      'html,body': {
        fontSize: '14px',
        lineHeight: '1.4285em',
        backgroundColor: 'white',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      }
    }}
    />
    {children}
  </Wrapper>
)

export default Home
