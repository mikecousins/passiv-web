



describe('Login using created data from registration', () => {
    it('Log in Success', () => {
      
      
        cy.intercept( '/api/v1/auth/login/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/put_auth.json'})
      })
    })
      .as('Put')

        cy.intercept('/api/v1/ping', (req) => { req.reply((res) => { res.send({  fixture: '/login_stubs/ping.json'})
      })
    })
      .as('Ping')


        cy.intercept('/api/v1/incentives/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/incentives.json' })
      })
    })
      .as('Incentives')
      
        cy.intercept('/api/v1/features/', (req) => { req.reply((res) => { res.send({  fixture: '/login_stubs/features.json' })
      })
    })  
      .as('Features')

        cy.intercept('/api/v1/currencies/rates/', (req) => { req.reply((res) => { res.send({  fixture: '/login_stubs/currencies.json' })
      })
    })
      .as('Currencies')

        cy.intercept('/api/v1/subscriptions/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/subscriptions.json' })
      })
    })
      .as('Subscriptions')

        cy.intercept('/api/v1/accounts/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/accounts.json' })
      })  
    })
      .as('Accounts')

        cy.intercept('/api/v1/portfolioGroups/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/portfolioGroups.json' })
      })
    })    
      .as('PG[]')

      cy.intercept('/api/v1/settings/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/settings.json' })
      })
    })
      .as('Settings')

      cy.intercept('/api/v1/plans/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/plans.json' })
      })
    })
      .as('Plans')

      cy.intercept('/api/v1/goals/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/goals.json' })
      })
    })
      .as('Goals')

    
      cy.intercept('/api/v1/help/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/help.json' })
      })
    }) 
      .as('Help')

      cy.intercept('/api/v1/brokerages/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/brokerages.json' })
      })
    })
      .as('Brokerages')


      cy.intercept('/api/v1/authorizations', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/autho.json' })
      })
    })
      .as('Questrade')

        cy.intercept('POST', '/api/v1/performance/all/**', (req) => { req.reply((res) =>  { res.send({  fixture: '/login_stubs/performance.json'})
      })
    })
      .as('Perf')

        cy.intercept('OPTIONS', '/api/v1/accounts/**/balances/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/balances.json' })
      })    
    })
      .as('Balances_option')

      cy.intercept('OPTIONS', '/api/v1/accounts/**/positions/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/positions.json' })
      })
    })
      .as('Positions_options')

      cy.intercept('OPTIONS', '/api/v1/portfolioGroups/**/info/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/info.json' })
      })
    }) 
      .as('Info_options')


        cy.intercept('v1', (req) => { req.reply((res) => { res.send({  fixture: '/login_stubs/v1.json' })
      })
    })
      .as('V1')


      cy.fixture('testDomain').as('login')
      cy.get('@login').then(domain => {
      cy.visit((domain.test).concat('/login')) })
    cy.location('pathname').should('equal', '/app/login')

    // enter valid username and password
    cy.fixture('credentials').as('userFixture')
    cy.get('@userFixture').then(user => {
    cy.get('[name=email]').first().type(user.username)
    cy.get('[placeholder=Password]').type(user.password)
    .get('form').submit()
 



  
  })
})
})