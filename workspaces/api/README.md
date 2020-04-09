# COVID-19 API

COVID-19 service access point

## Installation

First create a folder where you want your service api to be installed.
Then install the service as follows:

```bash
$ mkdir covid-19-api
$ cd covid-19-api
$ yarn add @identity-box/covid-19-api
$ yarn setup
```

## Usage

To directly run the service, use:

```bash
./node_modules/.bin/covid-19-api
```

## With PM2

You can take of advantage of pm2 to start the api service. Make sure you have pm2 installed globally:

```bash
$ yarn global add pm2
```

and ensure it is in `$PATH`:

```bash
export PATH=$PATH:/home/pi/.yarn/bin
```

### Start service

```bash
$ pm2 start ecosystem.config.js
```

### List all services

```bash
$ pm2 list
```

### Settings on a service

```bash
$ pm2 show covid-19-api
```

### Logs

To show both stdout and stderr logs run:

```bash
$ pm2 logs covid-19-api
```

This shows all the logs of covid-19-api and outputs the last 15 lines (the default).

To see only standard output logs, and print more lines from the output use:

```bash
$ pm2 logs covid-19-api --out --lines 150
```

### Restart process after editing ecosystem

```bash
$ pm2 delete ecosystem.config.js
$ pm2 start ecosystem.config.js
```

## Debug application from this directory

```bash
$ ./index.js
```
