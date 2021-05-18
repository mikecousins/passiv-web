it('Login test 2', () => {
    cy.visit('https://app.passiv.com/app/login/')


// Copy and paste place login here when testing 
    const typedtext = 'asutherland8219@gmail.com'
    const typedtext2 = 'test12345'
////////////////////////////////////////////////////

    cy.get('[name=email]')
    .type(typedtext)
    .should('have.value', typedtext)
    cy.get('[placeholder=Password]')
    .type(typedtext2)
    .should('have.value', typedtext2)

// Verify the sign in button is enabled//
cy.get('[data-cy=login-button]').should('not.be.disabled')
.click({multiple:true})
    cy.contains('Individual TFSA').click()
    cy.contains('Overview').click().wait(8000)
    cy.scrollTo('bottom')
    cy.get('button').contains('Edit Targets').wait(4000).click()
// add TSLA at 1% portfolio
    cy.contains('Add').click()
        cy.get('[placeholder=Search for security...]')
        .click()
        .type('Tesla')
})