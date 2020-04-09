import React from 'react'
import { Box } from 'src/components/ui-blocks'

import { Box1Content1 } from './Box1Content1'

const Box1 = ({ data }) => (
  <Box css={{ backgroundImage: 'none' }}>
    <Box1Content1 data={data} />
  </Box>
)

export { Box1 }
