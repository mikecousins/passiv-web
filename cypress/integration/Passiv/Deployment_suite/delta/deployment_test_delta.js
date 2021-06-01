6// Sidebar_test_live
describe('Sidebar individual component test', () => {

  it('Collapse button works', () => {
      cy.fixture('testDomain').as('server')
      cy.get('@server').then(domain => {
      cy.visit(domain.test) })
  cy.contains('Collapse').click()
  })

  it('Expand button works', () => {
      cy.contains('Expand').click()
  })

  it('Sign up button works', () => {
      cy.contains('Sign Up').click()
      .should('have.attr', 'href', '/register')

  })

  it('Login button works', () => {
      cy.contains('Login').click()
      .should('have.attr', 'href', '/login')

  })

  it('Help button works', () => {
      cy.contains('Help').click()
      .should('have.attr', 'href', '/help')
  })

  it('Reset password button works', () => {
      cy.contains('Reset').click()
      .should('have.attr', 'href', '/reset-password')

  it('Login button works', () => {
      cy.contains('Login').click()
      .should('have.attr', 'href', '/login')
  })

      cy.clearCookies()
  })

})

  // Login validity test
describe('Login individual component test', () => {
  it('accepts input email', () => {
      cy.fixture('testDomain').as('login')

      cy.get('@login').then(domain => {
      cy.visit((domain.test).concat('/login')) })
      cy.fixture('my_credentials').as('userFixture')
      cy.get('@userFixture').then(user => {
      cy.get('[name=email]').type(user.username)
      })

      // Verify that the signin button disabled with email //
      cy.get('[data-cy=login-button]').should('be.disabled')

  })


  // Verify the sign in button is disabled without email //
  it('accepts input password', () => {
      cy.fixture('testDomain').as('login')
      cy.get('@login').then(domain => {
      cy.visit((domain.test).concat('/login')) })
      cy.fixture('my_credentials').as('userFixture')
      cy.get('@userFixture').then(user => {
      cy.get('[placeholder=Password]').type(user.password)
      })
      cy.get('p').should('have.text', "An email is required.Forgot your password?Reset it!Don't have an account?Sign up!")

  cy.get('[data-cy=login-button]').should('be.disabled')

  })


  // Verify the error prompt works
  it('Error Prompt', () => {
      cy.fixture('testDomain').as('login')
      cy.get('@login').then(domain => {
      cy.visit((domain.test).concat('/login')) })
      cy.fixture('my_credentials').as('userFixture')
      cy.get('@userFixture').then(user => {
      cy.get('[name=email]').type(user.username)
      cy.get('[placeholder=Password]').type('5browed8')
      })
      cy.get('[data-cy=login-button]').click()

      cy.get('p').should('have.text', "Unable to log in with provided credentials.Forgot your password?Reset it!Don't have an account?Sign up!")

  })

  //Send pass reset email

  it('Reset Pass works', () => {
      cy.intercept('POST', '/api/v1/auth/resetPassword/', {
          statusCode: 200,
          body: 'it worked!'
      }).as('Reset')
      cy.intercept('https://app.delta.passiv.com/reset-password').as('redirect')
      cy.fixture('testDomain').as('server')
      cy.get('@server').then(domain => {
      cy.visit((domain.test).concat('/reset-password')) })
      cy.get('input').click({multiple:true}).type('asutherland8219@gmail.com')
      cy.get('button').contains('Reset').click()
      cy.wait('@Reset')


  })

  it('Email for help', () => {
      cy.intercept('POST', '/api/v1/auth/help', {
          statusCode: 200,
          body: 'it worked!'
      }).as('help')
      cy.intercept('POST', '/api/v1/feedback', {
          statusCode: 200,
          body: 'it worked!'
      }).as('email')
      cy.fixture('testDomain').as('server')
      cy.get('@server').then(domain => {
      cy.visit((domain.test).concat('/help')) })
      cy.fixture('my_credentials').as('userFixture')
      cy.get('@userFixture').then(user => {
          cy.get('[name=le]').first().type(user.username)
          cy.get('[name=lm]').first().type("test")
      cy.get('button').contains('Send Message').click()
      cy.wait('@email')


      })

  })

  describe('Test Brokerage Auth Connections', () => {
      beforeEach(() => {

        cy.intercept('/api/v1/brokerages/**', (req) => {
          req.reply({fixture: 'login_stubs/brokerages.json'})
        }).as('connect')

      })


      it('Login test', () => {
        cy.fixture('testDomain').as('login')
        cy.get('@login').then(domain => {
        cy.visit((domain.test).concat('/login')) })
        cy.fixture('my_credentials').as('userFixture')
        cy.get('@userFixture').then(user => {
        cy.get('[name=email]').first().type(user.username)
        cy.get('[placeholder=Password]').type(user.password)



    // Verify the sign in button is enabled//
      cy.get('[data-cy=login-button]').should('not.be.disabled')
    .click({multiple:true})

      })

  })


      it('Add Alpaca', () => {
          cy.get('div').contains('Settings').click().wait(8000)
          cy.get('button').contains('Add').first().click().wait(10000)
          cy.get('div').contains('Alpaca').click()


          cy.wait('@connect')
          .its('response.statusCode').should('eq', 200)
      })

      it('Add Wealthica', () => {
        cy.get('div').contains('Settings').click().wait(8000)
        cy.get('button').contains('Add').first().click().wait(5000)
        cy.get('div').contains('Wealthica').click()
        cy.get('button').contains('Connect').click()

        cy.wait('@connect')
        .its('response.statusCode').should('eq', 200)

     })

      it('Add Questrade', () => {

          cy.get('div').contains('Settings').click().wait(8000)
          cy.get('button').contains('Add').first().click().wait(5000)
          cy.get('div').contains('Questrade').click()

          cy.wait('@connect')
          .its('response.statusCode').should('eq', 200)

        })

      it('Add IBKR', () => {

          cy.get('div').contains('Settings').click().wait(8000)
          cy.get('button').contains('Add').first().click().wait(5000)
          cy.get('div').contains('IBKR').click()
          cy.get('button').contains('Connect').click()

          cy.wait('@connect')
          .its('response.statusCode').should('eq', 200)

        })

      it('Add Tradier', () => {
          cy.get('div').contains('Settings').click().wait(8000)
          cy.get('button').contains('Add').first().click().wait(5000)
          cy.get('div').contains('Tradier').click()

          cy.wait('@connect')
          .its('response.statusCode').should('eq', 200)

        })

      // it('Add Kraken', () => {
      //     cy.get('div').contains('Settings').click().wait(8000)
      //     cy.get('button').contains('Add').first().click().wait(5000)
      //     cy.get('div').contains('Kraken').click()

      //     cy.wait('@connect')
      //     .its('response.statusCode').should('eq', 200)

      //   })

      //   it('Add Zerodha', () => {
      //     cy.get('div').contains('Settings').click().wait(8000)
      //     cy.get('button').contains('Add').first().click().wait(5000)
      //     cy.get('div').contains('Zerodha').click()

      //     cy.wait('@connect')
      //     .its('response.statusCode').should('eq', 200)

      //   })

      //   it('Add Unocoin', () => {
      //     cy.get('div').contains('Settings').click().wait(8000)
      //     cy.get('button').contains('Add').first().click().wait(5000)
      //     cy.get('div').contains('Unocoin').click()

      //     cy.wait('@connect')
      //     .its('response.statusCode').should('eq', 200)

      //   })


      it('Logout', () => {
          cy.get('nav').find('button').contains('Logout').click().wait(5000)

      })

      })

    })


// Login, add to current portfolio,  reset and build from scratch **Model portfolios only***


  describe('Login and Adjust portfolio', () => {

    // Re-login
    it('Login test 2', () => {
        cy.fixture('testDomain').as('login')
        cy.get('@login').then(domain => {
        cy.visit((domain.test).concat('/login')) })
        cy.fixture('my_credentials').as('userFixture')
        cy.get('@userFixture').then(user => {
        cy.get('[name=email]').first().type(user.username)
        cy.get('[placeholder=Password]').type(user.password)

    // Verify the sign in button is enabled//
    cy.get('[data-cy=login-button]').should('not.be.disabled')
    .click({multiple:true})
    })
  })


  it('Test Portfolio settings', () => {

    cy.contains('Portfolio').click().wait(8000)

    cy.get('div').contains('Portfolio Settings').click().wait(8000)

    // Test the toggles in the settings page
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).uncheck().should('not.be.checked')

        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).uncheck().should('not.be.checked')


        cy.get('input[type="checkbox"]').eq(2).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).uncheck().should('not.be.checked')


        cy.get('input[type="checkbox"]').eq(3).check().should('be.checked')

        cy.get('input[type="checkbox"]').eq(4).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(4).uncheck().should('not.be.checked')

        cy.get('input[type="checkbox"]').eq(3).uncheck().should('not.be.checked')


    })

    it('Test Cash management', () => {
      cy.get('div').contains('Add Rule').click()
      cy.get('input').last().type('1000')
      cy.get('Button').contains('Submit').click()
      cy.get('div').contains('Delete').click()

    })

  })




  //     cy.contains('My Models').click().wait(8000)

  // })

  // it('Test duplicate and delete function for models', () => {
  //   cy.get('div').contains('tester').prev().click()
  //   cy.get('button').contains('Duplicate').click()
  //   cy.get('body').focus().click()

  // // delete the model and duplicate again
  //   cy.get('div').contains('tester(Copy)').prev().click()
  //   cy.get('button').find('Delete').click()

  //   cy.get('button').contains('Delete').click()

  //   cy.get('div').contains('tester').prev().click()
  //   cy.get('button').contains('Duplicate').click()
  //   cy.get('body').focus()


  // })

  // })

  // reset the portfiol and build a new one
describe('Reset and build portfolio manually', () => {
    it('Reset', () => {
        cy.contains('test').click()
        cy.contains('Portfolio').click().wait(8000)
        cy.get('div').contains('Reset').click()

        cy.contains('test').click()
        cy.contains('Portfolio').click().wait(8000)


        cy.get('button').contains('New Model').click().wait(8000)
        cy.get('button').contains('Edit Name').click()
        cy.get('input').eq(0).clear().type('chips2')
        cy.get('button').contains('Done').click()

            //creating a new portfolio
      cy.get('input').eq(-2).click().clear().type(15)
      cy.get('input').last().type('MSFT').wait(5000).type('{downarrow}').wait(5000).type('{enter}').wait(5000)



      cy.get('input').eq(-2).click().clear().type(5)
      cy.get('input').last().type('MLPA').wait(5000).type('{downarrow}').wait(5000).type('{enter}').wait(6000.)

      cy.get('input').eq(-2).click().clear().type(5)
      cy.get('input').last().type('PNG.VN').wait(5000).type('{downarrow}').wait(5000).type('{enter}').wait(6000)

      cy.get('div').contains('Share Model').next().click()
      cy.get('div').contains('Share Model').next().click()

      cy.get('button').contains('Save').click().wait(6000)

      cy.get('button').contains('Apply to Portfolio').click()


  //Refreh
    cy.get('button').contains('Refresh').click()

  })


  it('Apply tester and delete created portfolio', () => {
    cy.get('div').contains('My Models').click()

    cy.get('div').contains('tester').next().next().click()
    cy.get('div').contains('Portfolio').click()
    cy.get('div').contains('My Models').click()

    cy.get('div').contains('chips2').prev().click().contains('Delete').click()
    cy.get('Button').contains('Cancel').prev().click()

  })

  })


  describe('Add goals', () => {

    it('Goals Test', () => {
      cy.contains('Goals').click()
      .should('have.attr', 'href', '/goals')
  })


  //these are the values for the goal
  const goal1 = "Get the bag"
  const goalnumber = "1000000"
  const month = "July"
  const year = "2050"

  const goal2 = "Get the bread"
  const goalnumber2 = "10000000"



  it('Create a goal name', () => {
  cy.get('[id=goalname]')
  .clear()
  .type(goal1)
  .should('have.value', goal1)
  })

  it('Next' , () => {
  cy.get('div').find('button').contains('Next')
  .click()
  })


  it('Optional Account Selection ' , () => {
  cy.get('div').find('button').contains('All Accounts')
  .click()
  })

  //     // This is the block for no account@class='css-jm466k']

  // it('Pick portfolio Account ' , () => {
  //     cy.get('div').find('button').contains('Retirement TFSA')
  //     .click()
  // })

  it('Next' , () => {
  cy.get('div').find('button').contains('Next')
  .click()
  })

  it('Enter goal ammount', () => {
  cy.get('div').find('label').contains('I want to reach $').next()
  .click({multiple:true})
  .type(goalnumber)
  .should('have.value', goalnumber)
  })

  it('Enter Year', () => {
  cy.get('div').find('label').contains('By').next().next()
  .clear()
  .type(year)
  .should('have.value', year)
  })

  it('Confirm Goal', () => {
  cy.get('button').contains('Start Saving!').click()
  cy.get('button').contains('Refresh').click().wait(4000)

  })

  it('Return to Dashboard  Page', () => {
  cy.fixture('testDomain').as('login')

  cy.get('@login').then(domain => {
  cy.visit((domain.test).concat('/dashboard')) })
  cy.get('button').contains('Refresh').click().wait(4000)
  })


  it('Return to Goals Page', () => {
  cy.fixture('testDomain').as('login')

  cy.get('@login').then(domain => {
  cy.visit((domain.test).concat('/goals')) })
  })

  //Refreh
  it('Refresh', () => {

  cy.get('button').contains('Refresh').click()

  })



  it('Edit Goal', () => {
  cy.contains('Goals').click()
  cy.get('div').contains(goal1)
  .click({multiple:true})
  })

  it('Change goal name', () => {
  cy.get('div').find('div.css-ov1ktg main.css-ozbw39 div.css-875kku div.css-2lma4n div:nth-child(3) > button.css-1v6e5e8').click()
  cy.get('button').contains('Edit Name').click({multiple: true})
  .get('div').find('input').first()
  .clear()
  .type(goal2)

  cy.contains('Finish').click()
  })

  it('Update Goal', () => {
  cy.get('button').contains('Update Goal').click()

  })

  it('Update the target amount', () => {
  cy.get('button').contains('Edit Target').click()
  .get('div').find('input').last()
  .clear()
  .type(goalnumber2)
  .get('button').contains('Update').click()

  })

  it('Update Goal', () => {
  cy.get('button').contains('Update Goal').click()

  })

  it('Delete Goal', () => {
    cy.get('div').contains('Goals').click()
    cy.get('h2').contains(goal1).click()
    cy.get('div').find('div.css-ov1ktg main.css-ozbw39 div.css-875kku div.css-2lma4n div:nth-child(3) > button.css-1v6e5e8').click()
    cy.get('button').contains('Delete Goal').click({multiple: true})
    cy.get('div').find('div:nth-child(1) div:nth-child(1) div:nth-child(1) div.css-1y1hlfi > button.css-jm466k').click().wait(10000)
  })





  it('Reset to Dashboard', () => {
  cy.fixture('testDomain').as('login')
  cy.get('@login').then(domain => {
  cy.visit((domain.test).concat('/Dashboard')) })
  })

  it('View all Goals', () => {
    cy.fixture('testDomain').as('login')

    cy.get('@login').then(domain => {
    cy.visit((domain.test).concat('/goals')) })
  })

  })



describe('Change name and test auth signal and allocate button', () => {
  it('Change name', () => {
      cy.get('div').contains('Settings').click().wait(8000)
      cy.get('button').contains('Edit').first().click()
      cy.get('input').clear().type('tesla').type('{enter}')
  })

  it('test auth', () => {
      cy.intercept('/api/v1/auth/otp/**', (req) => {
          req.reply({fixture: 'login_stubs/otp.json'})
      }).as('otp')
      cy.get('button').contains('Enable').click()
  })

  it('test sms', () => {
      cy.intercept('/api/v1/auth/sms/**', (req) => {
          req.reply({fixture: 'login_stubs/otp.json'})
      }).as('otp')

      cy.get('button').contains('Enable').last().click()

  })

  it('Test Allocate button', () => {
      cy.fixture('testDomain').as('login')
        cy.get('@login').then(domain => {
        cy.visit((domain.test).concat('/login')) })

      cy.get('div').contains('Dashboard').click().wait(8000)

      cy.get('div').contains('Allocate').click().as('allocate')
        cy.contains('Trades').should('be.visible')

    })

})

