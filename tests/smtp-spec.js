'use strict';

const
  smtpServer = require('./smtpServer'),
  physical = require('../index')

function testAsync(runAsync) {
  return (done) => {
    runAsync()
      .then(done, error => {
        fail(error)
        done()
      })
  }
}

describe('Physical SMTP', () => {
  
  it('returns failure when smtp cannot connect', testAsync(async () => {
    let smtpOptions = { port: 25, server: 'localhost' }
    let smtpResult = await physical.smtp.check(smtpOptions)
    expect(smtpResult.isOk).toBe(false)
  }))

  it('includes error when smtp cannot connect', testAsync(async () => {
    let smtpOptions = { port: 25, server: 'localhost' }
    let smtpResult = await physical.smtp.check(smtpOptions)
    expect(smtpResult.error).toBeDefined()
  }))

  it('returns success when smtp can connect', testAsync(async () => {
    await smtpServer.start()
    let smtpOptions = { port: 1125, server: 'localhost' }
    let smtpResult = await physical.smtp.check(smtpOptions)
    expect(smtpResult.isOk).toBe(true)
    await smtpServer.stop()
  }))

})
