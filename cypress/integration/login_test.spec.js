describe('Pass', () => {
    beforeEach( () => {  
        cy.visit('/app/login')
    })


    it('accepts input email', () => {
        const typedtext = 'a.suds@unb.ca'
        cy.get('[name=email]')
          .type(typedtext)
          .should('have.value', typedtext)
      
      // Verify that the signin button disabled with email //
        cy.get('[data-cy=login-button]').click()
        
      
      })
    
    it('accepts input password', () => {
    const typedtext2 = 'Mancity2021Champs'
    cy.get('[name=password')
    .type(typedtext2)
    .should('have.value', typedtext2)

    // Verify the sign in button is disabled without email //
    cy.get('[data-cy=login-button]').click()
      
    })

    it('Button works with email AND password', () => {
        const typedtext = 'a.suds@unb.ca'
        const typedtext2 = '5Browse8'
        cy.get('[name=email]')
        .type(typedtext)
        .should('have.value', typedtext)
        cy.get('[name=password')
        .type(typedtext2)
        .should('have.value', typedtext2)
    
    // Verify the sign in button is enabled//
    cy.get('[data-cy=login-button]').click()
    
        })
     
});