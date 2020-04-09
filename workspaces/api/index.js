#!/bin/sh
":" //# http://sambal.org/?p=1014 ; exec /usr/bin/env node -r esm "$0" "$@"

import { CovidAPI } from './src/entry-point'
import commander from 'commander'

const program = new commander.Command()

const start = cmdObj => {
  const { servicePath, registrationPath } = cmdObj
  console.log('servicePath=', servicePath)
  console.log('registrationPath=', registrationPath)
  const covidAPI = new CovidAPI({
    servicePath,
    registrationPath
  })
  covidAPI.start()
  process.on('SIGINT', () => {
    console.log(`stopping ${servicePath}...`)
    covidAPI.stop()
    console.log('stopped. exiting now...')
    process.exit(0)
  })
  process.stdin.resume()
}

async function main () {
  program
    .version('0.1.0')
    .usage('command [options]')
    .on('command:*', () => {
      console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '))
      process.exit(1)
    })

  program.command('start')
    .option('-p, --servicePath <path>', 'service path for the service in the format: service-namespace.service-id', 'covid-19.authentication-service')
    .option('-r, --registrationPath <path>', 'registration path for the service in the format: service-namespace.service-id', 'identity-box.service-registration')
    .action(start)

  await program.parse(process.argv)

  if (!process.argv.slice(2).length) {
    program.help()
  }
}

main()
