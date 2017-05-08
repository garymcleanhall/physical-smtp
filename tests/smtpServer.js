'use strict';

const
  SMTPServer = require('smtp-server').SMTPServer

const server = new SMTPServer()

function _start() {
  server.listen(1125)
}

function _stop() {
  server.close()
}

module.exports = {
  start: _start,
  stop: _stop
}