const _ = require('lodash')
const server = require('./config/origin/server.info')
const ftp = require('./modules/ftp')
const updatefiles = require('./config/origin/updatefiles')

const main = async () => {
  for (path of updatefiles.paths) {
    await ftp.connect(server)
    await ftp.remove(server, path)
    await ftp.end()
  }
}

main()