
const Client = require('ftp');
const moment = require('moment');
const backupDate = moment().format('YYYYMMDD')
const conn = new Client();

const connect = (server) => {
  return new Promise((resolve, reject) => {
    conn.on('ready', function () {
      // console.log("ready ftp...")
      return resolve()
    }).connect({
      host: server.host,
      port: 21,
      user: server.username,
      password: server.password
    })
  });
}

const upload = (server, path) => {
  return new Promise((resolve, reject) => {
    conn.put(path, server.root + path, function (err) {
      if (err) {
        console.log("upload error. " + path)
        return resolve()
      } else {
        console.log("uploaded. " + path)
        return resolve()
      }
    });
  });
}

const rename = (server, path) => {
  return new Promise((resolve, reject) => {
    conn.rename(server.root + path, server.root + path + '_' + backupDate, function (err) {
      if (err) {
        console.log("rename error. " + path)
        return resolve()
      } else {
        console.log("renamed. " + path)
        return resolve()
      }
    });
  });
}

const remove = (server, path) => {
  return new Promise((resolve, reject) => {
    conn.delete(server.root + path, function (err) {
      if (err) {
        console.log("remove error. " + path)
        return resolve()
      } else {
        console.log("removed. " + path)
        return resolve()
      }
    });
  });
}

const end = () => {
  return new Promise((resolve, reject) => {
    conn.end()
    conn.on('end', function(){
      return resolve()
    })
  });
}

exports.connect = connect
exports.upload = upload
exports.rename = rename
exports.remove = remove
exports.end = end