
  it('Add Alpaca', () => {
      cy.intercept('POST', '/app/settings/connect/', {
          statusCode: 200,
          body: 'it worked!'
      }).as('connect')
      cy.intercept('POST', 'https://app.alpaca.markets/connect', {
          statusCode: 200,
          body: 'Llama'
      }).as('Alpaca')

      cy.fixture('testDomain').as('login')
      cy.get('@login').then(domain => {
      cy.visit((domain.test).concat('/login')) })
      cy.fixture('my_credentials').as('userFixture')
      cy.get('@userFixture').then(user => {
      cy.get('[name=email]').first().type(user.username)
      cy.get('[placeholder=Password]').type(user.password)

      cy.get('[data-cy=login-button]').should('not.be.disabled')
    .click({multiple:true})
  
      })

  })
  
  // Verify the sign in button is enabled//
  it('Test Allocate button', () => {
    cy.fixture('testDomain').as('login')
      cy.get('@login').then(domain => {
      cy.visit((domain.test).concat('/login')) })
  
    cy.get('div').contains('Dashboard').click().wait(8000)
      
    cy.get('div').contains('Allocate').click().as('allocate')
      cy.contains('Trades').should('be.visible')

  })    
    

  
  // it('Add Questrade', () => {
  //     cy.get('div').contains('Settings').click().wait(8000)
  //     cy.get('button').contains('Add').first().click()
  //     cy.get('div').contains('Questrade').click()

  //     cy.location().should((loc => {
  //       expect(loc.href).to.eq('https://login.questrade.com/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fresponse_type%3Dcode%26client_id%3D8060ad5d-48fb-414d-b212-5b686c31a7d1%26redirect_uri%3Dhttps%253A%252F%252Flogin.questrade.com%252FOAuth2%252Foidc-callback%26scope%3Dopenid%26state%3DAQAAANCMnd8BFdERjHoAwE_Cl-sBAAAALh2ttvVaS0G2bcOpVrXx9QQAAAACAAAAAAAQZgAAAAEAACAAAABgKSRb3uPbdkyOU8baSeG61kqkES_UQkO4SbU8k_dppgAAAAAOgAAAAAIAACAAAADMZ0G4F8fwbc5K9Dy5ia6QQsf3SeZ3ACoImHxXfwR0w6AAAABJoHzaIZgc-D44rTE1fdhWwQx_wMpdAIcXz7cQ516p6HDa434kgZ73yDyBzaGMJ5oyd2ib4OXkb11lAu0G1AuZfgF6jxV3238B_Qe3YE2dxU86H594MVocYrVD-DIKDKd7vJfGdoltWaQ65ckiJ8HWzDSntM28E8dje1Nb3z_iUrwQ882yrWuwOS1QvcV-zPTqrkHiEQ-pmonEmCokBqyKQAAAAAyGx8H7O79HbTcYvwjj-D1UQYD1L-yIiFric0eChKoEbfpZHbAczT93MJ36JbkHft-VlqNzL1-lW08grZLqn7k')
  //     }))
  //   })

  // it('Add IBKR', () => {
  //     cy.get('div').contains('Settings').click().wait(8000)
  //     cy.get('button').contains('Add').first().click()
  //     cy.get('div').contains('IBKR').click()

  //     cy.location().should((loc => {
  //       expect(loc.href).to.eq('https://www.interactivebrokers.com/authorize/')
  //     }))
  //   })

  // it('Add Alpaca', () => {
  //     cy.get('div').contains('Settings').click().wait(8000)
  //     cy.get('button').contains('Add').first().click()
  //     cy.get('div').contains('Alpaca').click()

  //     cy.location().should((loc => {
  //       expect(loc.href).to.eq('https://app.alpaca.markets/connect')
  //     }))
  //   })

  // it('Add Tradier', () => {
  //     cy.get('div').contains('Settings').click().wait(8000)
  //     cy.get('button').contains('Add').first().click()
  //     cy.get('div').contains('Tradier').click()

  //     cy.location().should((loc => {
  //       expect(loc.href).to.eq('https://brokerage.tradier.com/user/login')
  //     }))
  //   })

  // it('Add TD Ameritrade', () => {
  //     cy.get('div').contains('Settings').click().wait(8000)
  //     cy.get('button').contains('Add').first().click()
  //     cy.get('div').contains('TD Ameritrade').click()

  //     cy.location().should((loc => {
  //       expect(loc.href).to.eq('https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=https%3A%2F%2Fgetpassiv.com%2Foauth%2Ftd&client_id=COZMSAFYLVJWJND7FPF9XEHAYKENERQY%40AMER.OAUTHAP')}
  //       )
  //     )
  //   })
  // })

