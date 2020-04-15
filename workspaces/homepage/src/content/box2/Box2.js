import React from 'react'
import { Box } from 'src/components/ui-blocks'

import { Box2Content1 } from './Box2Content1'

const Box2 = ({ data }) => (
  <Box css={{ backgroundImage: 'none' }}>
    <Box2Content1 data={data} />
  </Box>
)

export { Box2 }
