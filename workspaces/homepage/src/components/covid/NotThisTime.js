import React from 'react'
import { FadingValueBox } from 'src/components/animations'
import { InfoBox, MrSpacer, Red, Centered } from 'src/components/ui'

const NotThisTime = () => (
  <FadingValueBox>
    <Centered>
      <MrSpacer space='50px' />
      <InfoBox>Sorry <Red>not this time!</Red>!</InfoBox>
      <MrSpacer space='50px' />
    </Centered>
  </FadingValueBox>
)

export { NotThisTime }
