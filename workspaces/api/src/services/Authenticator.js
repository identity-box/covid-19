import { StateSerializer } from '@identity-box/utils'

import path from 'path'

class Authenticator {
  authenticatedUsers = []

  constructor ({ serializerFilePath } = {}) {
    const filePath = serializerFilePath || path.resolve(process.cwd(), 'AuthenticatedUsers.json')
    this.stateSerializer = new StateSerializer(filePath)
    this.authenticatedUsers = this.stateSerializer.read() || []
  }

  isAuthenticated = userName => {
    return this.authenticatedUsers.includes(userName)
  }

  authenticate = ({ userName, password }) => {
    if (!this.isAuthenticated(userName)) {
      this.authenticatedUsers.push(userName)
      this.stateSerializer.write(this.authenticatedUsers)
    }
    return {
      method: 'authenticate-response',
      params: []
    }
  }

  getAuthenticatedUsers = () => {
    return {
      method: 'get-authenticated-users-response',
      params: [{
        authenticatedUsers: this.authenticatedUsers
      }]
    }
  }
}

export { Authenticator }
