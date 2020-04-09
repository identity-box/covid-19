import ldap from 'ldapjs'
import fs from 'fs'

(async () => {
  const ldapConfig = {
    url: `ldaps://${process.env.LDAP_URL}:636`,
    tlsOptions: {
      ca: [fs.readFileSync(process.env.LDAP_CA_CERT)]
    }
  }

  const userId = process.env.LDAP_USER
  const password = process.env.LDAP_PWD

  const authenticate = (userId, password) => {
    return new Promise((resolve, reject) => {
      const ldapClient = ldap.createClient(ldapConfig)

      ldapClient.bind(
        userId,
        password,
        error => {
          if (error) {
            reject(error)
          }
          resolve(ldapClient)
        }
      )
    })
  }

  const search = (client, base) => {
    const searchOptions = {
      scope: 'base',
      filter: '(userPrincipalName=*@philips.com)'
    }
    return new Promise((resolve, reject) => {
      client.search(
        base,
        searchOptions,
        (err, res) => {
          if (err) {
            reject(err)
          }
          const entries = []
          res.on('searchEntry', entry => {
            entries.push(entry.object)
          })
          res.on('error', err => {
            reject(err)
          })
          res.on('end', result => {
            resolve({
              status: result.status,
              entries
            })
          })
        }
      )
    })
  }

  const close = client => {
    return new Promise((resolve, reject) => {
      client.unbind(error => {
        if (error) {
          reject(error)
        }
        resolve()
      })
    })
  }

  try {
    const client = await authenticate(userId, password)
    const { status, entries } = await search(client, userId)
    console.log('status: ' + status)
    console.log('-----')
    if (entries && entries.length > 0) {
      console.log(entries[0].serialNumber)
      console.log(entries[0].userPrincipalName)
    }
    await close(client)
    process.exit(0)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
})()

process.stdin.resume()
