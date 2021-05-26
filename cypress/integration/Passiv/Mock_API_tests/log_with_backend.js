describe('Login using created data from registration', () => {
    it('Log in Success', () => {


        cy.intercept('POST', '/api/v1/auth/login/', { fixture: '/login_stubs/login_token.json'})
      .as('Success')

        cy.intercept('/api/v1/ping', (req) => { req.reply((res) => { res.send({  fixture: '/login_stubs/ping.json'})
      })
    })
      .as('Ping')

        cy.intercept('/api/v1/currencies/rates/', (req) => { req.reply((res) => { res.send({  fixture: '/login_stubs/currencies.json' })
      })
    })
      .as('Currencies')

        cy.intercept('/api/v1/subscriptions/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/subscriptions.json' })
      })
    })
      .as('Subscriptions')

      cy.intercept('/api/v1/settings/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/settings.json' })
      })
    })
      .as('Settings')

      cy.intercept('/api/v1/plans/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/plans.json' })
      })
    })
      .as('Plans')

      cy.intercept('/api/v1/help/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/help.json' })
      })
    })
      .as('Help')

      cy.intercept('v1', {  fixture: '/login_stubs/v1.json' })
      .as('V1')


      cy.fixture('localhost').as('login')
      cy.visit('/login', { responseTimeout: 310000 })
    cy.location('pathname').should('equal', '/login')

    // enter valid username and password
    cy.fixture('user').as('userFixture')
    cy.get('@userFixture').then(user => {
    cy.get('[name=email]').first().type(user.email)
    cy.get('[placeholder=Password]').type(user.password)
    })
    cy.get('form').submit()

    cy.wait('@Success')
    .then(({request, response}) => {
    expect(response.statusCode).to.eq(200)
    expect(request.body).to.have.property('email', 'testemail2@passiv.com')
    expect(request.body).to.have.property('password', 'passivtestpass')
    expect(request.method).to.eq('POST')






  })

})
})
