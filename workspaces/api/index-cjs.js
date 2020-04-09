#!/usr/bin/env node

import { CovidAPI } from './src/entry-point'
import { Server } from './src/server'

const covidAPI = new CovidAPI()
const server = new Server(covidAPI)

server.start()
