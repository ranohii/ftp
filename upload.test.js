const _ = require('lodash')
const server = require('./config/test/server.info')
const ftp = require('./modules/ftp')
const updatefiles = require('./config/test/updatefiles')


const main = async () => {
  for (path of updatefiles.paths) {
    await ftp.connect(server)
    await ftp.uploadFile(server, path)
    await ftp.end()
  }
}

main()