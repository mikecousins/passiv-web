const { MenuLink } = require("@reach/menu-button");

describe('Auth', () => {
  it('login page loads', () => {
    cy.visit('/app/login');
    cy.get('[data-cy=login-button]').click();
  })

  it.only('accepts input email', () => {
    const typedtext = 'a.suds@unb.ca'
    cy.visit('/app/login')
    cy.get('[name=email]')
      .type(typedtext)
      .should('have.value', typedtext)
  
  // Verify that the signin button disabled with email //
    cy.get('[data-cy=login-button]').click()
    
  
  })

  it.only('accepts input password', () => {
    const typedtext2 = 'Mancity2021Champs'
    cy.visit('/app/login')
    cy.get('[name=password')
    .type(typedtext2)
    .should('have.value', typedtext2)

  // Verify the sign in button is disabled without email //
    cy.get('[data-cy=login-button]').click()
  
  })


});


