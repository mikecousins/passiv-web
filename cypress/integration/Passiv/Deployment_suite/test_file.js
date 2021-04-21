
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

      cy.contains('test').click()
      cy.contains('Portfolio').click().wait(8000)
      cy.scrollTo('bottom')
      cy.get('button').contains('Edit Model').wait(4000).click()
      
    //changing asset allocation so portfolio balance
    cy.get('input').eq(-2).click().clear().type(15)
    cy.get('input').last().type('MSFT').type('{enter}')
    cy.get('button').contains('Save').click()


// add TSLA at 1% portfolio
  cy.contains('Add').click()
  cy.scrollTo('bottom')
      cy.get('input').last().wait(3000).click().clear().type('1')
      cy.get('input').eq(3)
      .click().type('TSLA').type('{enter}')


//save portfolio
  cy.get('button').contains('Save').click()
  cy.get('button').contains('Refresh').click()
  cy.fixture('testDomain').as('login')
      cy.get('@login').then(domain => {
      cy.visit(domain.test)})

})


})


// You will have to adjust this in order to make it meet your portfolio, it adjusts based on number of assets
describe('Reset and build portfolio manually', () => {
  it('Reset', () => {
      cy.contains('test').click()
      cy.contains('Portfolio').click().wait(8000)
      cy.scrollTo('bottom')
      cy.get('button').contains('Edit Model').click()
      cy.get('button').contains('Reset').click().wait(15000)

      cy.contains('test').click()
      cy.contains('Portfolio').click().wait(8000)
      cy.scrollTo('bottom')


      cy.get('button').contains('Build').click()

      // add TSLA at 1% portfolio
      cy.get('input').last().wait(3000).click().clear().type('1')
      cy.get('input').eq(0)
      .click().type('TSLA').type('{enter}')

// add Amazon to portfolio at 5%
  cy.contains('Add').click()
  cy.scrollTo('bottom')
      cy.get('input').last().wait(3000).click().clear().type('5')
      cy.get('input').eq(1).click().type('AMZN').type('{enter}')

  cy.contains('Add').click()
  cy.scrollTo('bottom')
      cy.get('input').last().wait(3000).click().clear().type('5')
      cy.get('input').eq(2).click().type('VGRO.TO').type('{enter}')

  cy.contains('Add').click()
  cy.scrollTo('bottom')
      cy.get('input').last().wait(3000).click().clear().type('5')
      cy.get('input').eq(3).click().type('AAPL').type('{enter}')


      cy.scrollTo('bottom')
      cy.get('button').contains('Save').click().as('save').wait(4000)
      cy.scrollTo('bottom')
      cy.get('button').contains('Edit Model').wait(4000).click()
      cy.get('button').contains('Reset').click().wait(8000)
      cy.get('button').contains('Import').click().wait(8000)



  })

  })


