import React, { useRef, useEffect, useCallback, useState } from 'react'

import { DarkInput, Label } from 'src/components/forms'

// From https://emailregex.com
const emailValidationRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const UserName = ({
  onUserNameChanged
}) => {
  const [userName, setUserName] = useState('')
  const userNameFieldRef = useRef(null)

  const isValidUserName = useCallback(userName => {
    console.log(userName.match(emailValidationRegEx))
    return userName.length > 0 &&
      userName.match(emailValidationRegEx)
  }, [])

  const handleOnChange = useCallback(event => {
    const newUserName = event.target.value
    if (newUserName === userName) {
      return
    }

    setUserName(newUserName)
    onUserNameChanged && onUserNameChanged(isValidUserName(newUserName) ? newUserName : '')
  }, [userName, isValidUserName, onUserNameChanged])

  useEffect(() => {
    setTimeout(() => {
      userNameFieldRef.current && userNameFieldRef.current.focus()
    }, 100)
  }, [])

  return (
    <>
      <Label htmlFor='frmEmailA'>Email:</Label>
      <DarkInput
        id='frmEmailA' type='email'
        name='email'
        ref={userNameFieldRef}
        value={userName}
        placeholder='first.second@hospital.com'
        required
        autocomplete='email'
        onChange={handleOnChange}
        css={{ marginBottom: '1rem' }}
      />
    </>
  )
}

export { UserName }
