import React, { useCallback } from 'react'
import { FadingValueBox } from '../animations'
import { InfoBox, MrSpacer } from '../ui'
import { Centered } from '@react-frontend-developer/react-layout-helpers'
import { Row } from 'src/components/ui-blocks'

import { Connector } from '../identity'
import { Button } from 'src/components/forms'

const IdAppConnect = ({ onConnected, header, subheader, title, cancelButtonTitle, cancelStage } = {}) => {
  const onDone = useCallback(telepathChannel => {
    console.log('Connected')
    onConnected && onConnected({ telepathChannel })
  }, [onConnected])

  const onCancel = useCallback(() => {
    onConnected && onConnected({ cancelStage })
  }, [onConnected, cancelStage])

  return (
    <FadingValueBox alignItems='center'>
      <Centered>
        <MrSpacer space='50px' />
        <InfoBox>{header || '-- OR --'}</InfoBox>
        {subheader &&
          <>
            <MrSpacer space='30px' />
            <InfoBox>{subheader}</InfoBox>
          </>}
        <MrSpacer space='50px' />
        {cancelButtonTitle
          ? (
            <Row css={{ width: '100%' }}>
              <Connector
                onDone={onDone}
                title={title || 'Login with Identity Box...'}
              />
              <Button
                onClick={onCancel}
                marginLeft='20px'
              >
                {cancelButtonTitle || 'Cancel'}
              </Button>
            </Row>
          ) : (
            <Connector
              onDone={onDone}
              title={title || 'Login with Identity Box...'}
            />
          )}
      </Centered>
    </FadingValueBox>
  )
}

export { IdAppConnect }
