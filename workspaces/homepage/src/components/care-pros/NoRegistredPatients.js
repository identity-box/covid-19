import React from 'react'
import { Segment } from 'semantic-ui-react'
import { FadingValueBox } from 'src/components/animations'
import { InfoBox, MrSpacer, Blue, Centered } from 'src/components/ui'

const NoRegistredPatients = () => (
  <FadingValueBox>
    <Centered>
      <MrSpacer space='50px' />
      <Segment>
        <InfoBox>We do not have any registered <Blue>patients</Blue> yet...</InfoBox>
      </Segment>
      <MrSpacer space='50px' />
    </Centered>
  </FadingValueBox>
)

export { NoRegistredPatients }
