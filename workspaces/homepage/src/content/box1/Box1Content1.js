import React, { useState, useCallback } from 'react'
import { LoginFormContent } from 'src/components/login'

import { IdAppConnect, RegisterDIDWithCovid, LoginWithIdentityBox, NotThisTime, EnjoyCovid } from 'src/components/covid'

const Stages = Object.freeze({
  Connect: 'connecting',
  Identity: 'Identity',
  NextTimeWithIdentityBox: 'next-time-with-identity-box?',
  LoginWithIdentityBox: 'login-with-identity-box',
  NotThisTime: 'not-this-time',
  Enjoy: 'Enjoy COVID-19!'
})

const Box1Content1 = ({ data }) => {
  const [workflow, setWorkflow] = useState(Stages.Connect)
  const [telepathChannel, setTelepathChannel] = useState(undefined)

  const onConnected = useCallback(({ cancelStage, telepathChannel }) => {
    if (!telepathChannel) {
      setWorkflow(cancelStage)
    } else {
      console.log('Connected to IdApp')
      setTelepathChannel(telepathChannel)
      setWorkflow(Stages.Identity)
    }
  }, [])

  const onLoggedIn = useCallback(() => {
    console.log('User authenticated!')
    setWorkflow(Stages.NextTimeWithIdentityBox)
  }, [])

  const onLoginWithIdentityBox = useCallback(({ telepathChannel }) => {
    console.log('Attempting to log in with Identity Box!')
    setTelepathChannel(telepathChannel)
    setWorkflow(Stages.LoginWithIdentityBox)
  }, [])

  const renderConnect = () => {
    return (
      <>
        <LoginFormContent onLoggedIn={onLoggedIn} data={data} />
        <IdAppConnect onConnected={onLoginWithIdentityBox} />
      </>
    )
  }

  const renderNextTimeWithIdentityBox = () => {
    return (
      <>
        <IdAppConnect
          onConnected={onConnected}
          header='Successfully Authenticated with COVID-19!'
          subheader='Do you want to use Identity Box to login to COVID-19 next time?'
          title='Yes, I want to use Identity Box next time...'
          cancelButtonTitle='Maybe later'
          cancelStage={Stages.Enjoy}
        />
      </>
    )
  }

  const renderLoginWithIdentityBox = () => {
    return (
      <>
        <LoginWithIdentityBox
          onDone={onDoneLoginWithIdentityBox}
          telepathChannel={telepathChannel}
        />
      </>
    )
  }

  const onDoneLoginWithIdentityBox = useCallback(status => {
    console.log(`Loggin with Identity Box ${status ? 'successful' : 'failure'}`)
    setWorkflow(status ? Stages.Enjoy : Stages.NotThisTime)
  }, [])

  const onDone = useCallback(() => {
    console.log('WE ARE DONE!!!!')
    setWorkflow(Stages.Enjoy)
  }, [])

  const renderIdentity = () => {
    return (
      <>
        <RegisterDIDWithCovid
          onDone={onDone}
          telepathChannel={telepathChannel}
        />
      </>
    )
  }

  const renderEnjoyCovid = () => {
    return (
      <>
        <EnjoyCovid />
      </>
    )
  }

  const renderNotThisTime = () => {
    return (
      <>
        <NotThisTime />
      </>
    )
  }

  console.log('workflow=', workflow)
  switch (workflow) {
    case Stages.Connect:
      return renderConnect()
    case Stages.Identity:
      return renderIdentity()
    case Stages.NextTimeWithIdentityBox:
      return renderNextTimeWithIdentityBox()
    case Stages.LoginWithIdentityBox:
      return renderLoginWithIdentityBox()
    case Stages.NotThisTime:
      return renderNotThisTime()
    case Stages.Enjoy:
      return renderEnjoyCovid()
    default:
      return null
  }
}

export { Box1Content1 }
