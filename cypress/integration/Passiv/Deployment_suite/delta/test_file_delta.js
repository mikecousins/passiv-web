

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


it('Test duplicate and delete function for models', () => {
  cy.contains('My Models').click().wait(8000)
  cy.get('button').contains('New Model').click().wait(8000)
  cy.contains('New Model').next().click()
  cy.get('input').first().clear().type('Asset Class Test')
  cy.get('button').contains('Done').click()


  cy.get('span').contains('Security').next().next().click()
  cy.get('button').contains('Cancel').prev().click()
})

it('Create Asset class, delete and recreate', () => {
  cy.contains('Asset Class').wait(8000)
  cy.get('button').contains('Add Asset Classes').click()
  cy.get('button').contains('New Asset Class').click().wait(8000)
  cy.contains('New Asset Class').first().next().click()
  cy.get('input').first().clear().type('Crap assets')
  cy.get('button').contains('Done').click()

  cy.contains('Add Security').click()
  cy.get('input').last().type('MLPA').wait(5000).type('{downarrow}').wait(5000).type('{enter}').wait(6000.)
  cy.contains('Add Security').click()
  cy.get('input').last().type('BP').wait(5000).type('{downarrow}').wait(5000).type('{enter}').wait(6000.)
  cy.contains('Add Security').click()
  cy.get('input').last().type('CVX').wait(5000).type('{downarrow}').wait(5000).type('{enter}').wait(6000.)

  cy.get('button').contains('Back to Model Portfolio').click()
  cy.get('button').contains('Delete').click()
  cy.get('button').contains('Cancel').prev().click()


})


})
