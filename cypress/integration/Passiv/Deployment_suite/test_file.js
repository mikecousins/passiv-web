

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


    cy.contains('My Models').click().wait(8000)

})

it('Test duplicate and delete function for models', () => {
  cy.get('div').contains('tester').prev().click()
  cy.get('button').contains('Duplicate').click()
  cy.get('body').focus().click()

// delete the model and duplicate again
  cy.get('div').contains('tester(Copy)').prev().click()
  cy.get('button').find('Delete').click()

  cy.get('button').contains('Delete').click()

  cy.get('div').contains('tester').prev().click()
  cy.get('button').contains('Duplicate').click()
  cy.get('body').focus()


})

})

//     it('Test building portfolio', () => {

//       cy.contains('test').click()
//       cy.contains('Portfolio').click().wait(8000)
//       cy.scrollTo('bottom')
//       cy.get('button').contains('Edit Model').wait(4000).click()

//     //adding new assets to an existing target
//     cy.get('input').eq(-2).click().clear().type(15)
//     cy.get('input').last().type('MSFT').type('{enter}')
//     cy.get('button').contains('Save').click().wait(4000)

//     cy.get('button').contains('Edit Model').wait(6000).click()
//     cy.get('input').eq(-2).click().clear().type(5)
//     cy.get('input').last().type('NFLX').type('{enter}')
//     cy.get('button').contains('Save').click().wait(6000)

//     cy.get('button').contains('Edit Model').wait(4000).click()
//     cy.get('input').eq(-2).click().clear().type(5)
//     cy.get('input').last().type('PNG.VN').type('{enter}')
//     cy.get('button').contains('Save').click().wait(6000)



// //Refreh
//   cy.get('button').contains('Refresh').click()

// })

// })

// // reset the portfiol and build a new one
// describe('Reset and build portfolio manually', () => {
//   it('Reset', () => {
//       cy.contains('test').click()
//       cy.contains('Portfolio').click().wait(8000)
//       cy.scrollTo('bottom')
//       cy.get('div').contains('Reset').click()

//       cy.contains('test').click()
//       cy.contains('Portfolio').click().wait(8000)


//       cy.get('button').contains('New Model').click()

//           //creating a new portfolio
//     cy.get('input').eq(-2).click().clear().type(15)
//     cy.get('input').last().type('MSFT').type('{enter}')
//     cy.get('button').contains('Save').click().wait(4000)

//     cy.get('button').contains('Edit Model').wait(6000).click()
//     cy.get('input').eq(-2).click().clear().type(5)
//     cy.get('input').last().type('MLPA').type('{enter}')
//     cy.get('button').contains('Save').click().wait(6000)

//     cy.get('button').contains('Edit Model').wait(4000).click()
//     cy.get('input').eq(-2).click().clear().type(5)
//     cy.get('input').last().type('PNG.VN').type('{enter}')
//     cy.get('button').contains('Save').click().wait(6000)


// //Refreh
//   cy.get('button').contains('Refresh').click()

// })

//   })

