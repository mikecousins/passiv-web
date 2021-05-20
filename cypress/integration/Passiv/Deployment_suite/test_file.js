

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
