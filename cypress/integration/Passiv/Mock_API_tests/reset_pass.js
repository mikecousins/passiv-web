it('Reset Pass works', () => {


  cy.intercept('POST', '/api/v1/auth/resetPassword/', {
      statusCode: 200,
      body: 'it worked!'
  }).as('Reset')

  cy.intercept('/api/v1/ping', (req) => { req.reply((res) => { res.send({  fixture: '/login_stubs/ping.json'})
})
})
.as('Ping')

cy.intercept('get','v1', (req) => { req.reply({ fixture: '/login_stubs/v1.json' })
})
.as('V1')



cy.intercept('/api/v1/help/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/help.json' })
})
})
.as('Help')


  cy.intercept('api.passiv.com/api/v1/auth/resetPassword/').as('redirect')
  cy.fixture('localhost').as('server')
  cy.get('@server')
  cy.visit('/reset-password')
  cy.get('input').click({multiple:true}).type('asutherland8219@gmail.com')
  cy.get('button').contains('Reset').click()



})
