import { StateSerializer } from '@identity-box/utils'

import path from 'path'

class DIDs {
  dids = []
  stateSerializer

  constructor ({ serializerFilePath } = {}) {
    const filePath = serializerFilePath || path.resolve(process.cwd(), 'DIDs.json')
    this.stateSerializer = new StateSerializer(filePath)
    this.dids = this.stateSerializer.read() || []
  }

  isRegistred = did => {
    return this.dids.includes(did)
  }

  registerDid = (method, did) => {
    if (!this.isRegistred(did)) {
      this.dids.push(did)
      this.stateSerializer.write(this.dids)
    }
    return {
      method: `${method}-response`,
      params: []
    }
  }

  checkDid = (method, did) => {
    return {
      method: `${method}-response`,
      params: [
        { status: this.isRegistred(did) }
      ]
    }
  }
}

export { DIDs }
