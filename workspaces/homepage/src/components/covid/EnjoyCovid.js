import React from 'react'
import { FadingValueBox } from 'src/components/animations'
import { InfoBox, MrSpacer, Blue, Centered } from 'src/components/ui'

const EnjoyCovid = () => (
  <FadingValueBox>
    <Centered>
      <MrSpacer space='50px' />
      <InfoBox>Enjoy <Blue>COVID-19</Blue>!</InfoBox>
      <MrSpacer space='50px' />
    </Centered>
  </FadingValueBox>
)

export { EnjoyCovid }
