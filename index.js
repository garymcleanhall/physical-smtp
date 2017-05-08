'use strict';

const
  simplesmtp = require('simplesmtp')

function _smtpCheck(options) {
  return new Promise((resolve, reject) => {
    let connection = simplesmtp.connect(options.port, options.server, options)

    connection.on('idle', () => {
      connection.removeAllListeners()
      connection.close()
      resolve({ isOk: true })
    })

    connection.on('error', error => {
      connection.removeAllListeners()
      connection.close()
      reject(error)
    })
  }).catch(error => ({ isOk: false, error }))
}

module.exports = {
  check: _smtpCheck
}