describe('Login individual component test', () => {
    beforeEach( () => {  
        cy.visit('/app/login')
    })


    it('accepts input email', () => {
        const typedtext = 'a.suds@unb.ca'
        cy.get('[name=password]').click
        cy.get('.error-messages')
        .should('contain', 'Unable to log in with provided credentials.')
          
        cy.get('[name=email]')
        .type(typedtext)
          .should('have.value', typedtext)
      
      // Verify that the signin button disabled with email //
        cy.get('[data-cy=login-button]').should('be.disabled')
        
      
      })
    
 

    // Verify the sign in button is disabled without email //
    it('accepts input password', () => {
      const typedtext2 = 'Mancity2021Champs'
      cy.get('[name=password')
      .type(typedtext2)   
      .should('have.value', typedtext2)

    cy.get('[data-cy=login-button]').should('be.disabled')
      
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
    cy.get('[data-cy=login-button]').should('not.be.disabled')
    
        })

});