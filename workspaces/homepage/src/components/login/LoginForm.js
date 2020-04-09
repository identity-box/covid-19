import React from 'react'
import { Box } from 'src/components/ui-blocks'

import { LoginFormContent } from './LoginFormContent'

const LoginForm = ({ data }) => (
  <Box>
    <LoginFormContent data={data} />
  </Box>
)

export { LoginForm }
