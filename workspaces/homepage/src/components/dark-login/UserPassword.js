import React, { useCallback, useState } from 'react'

import { DarkInput, Label } from 'src/components/forms'

const UserPassword = ({
  onUserPasswordChanged
}) => {
  const [userPassword, setUserPassword] = useState('')

  const handleOnChange = useCallback(event => {
    const newUserPassword = event.target.value
    if (newUserPassword === userPassword) {
      return
    }

    setUserPassword(newUserPassword)
    onUserPasswordChanged && onUserPasswordChanged(newUserPassword)
  }, [userPassword, onUserPasswordChanged])

  return (
    <>
      <Label htmlFor='user-password'>Password:</Label>
      <DarkInput
        id='user-password' type='email'
        name='password'
        value={userPassword}
        placeholder='<your password here>'
        required
        autocomplete='current-password'
        onChange={handleOnChange}
        css={{ marginBottom: '1rem' }}
      />
    </>
  )
}

export { UserPassword }
