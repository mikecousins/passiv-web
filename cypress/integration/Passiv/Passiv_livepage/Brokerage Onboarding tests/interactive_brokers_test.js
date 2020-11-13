describe('New User Registration Success', () => {

    it('Sign up button works', () => {
    cy.visit('localhost:3000/app')
    cy.contains('Sign Up').click({multiple: true})
    .should('have.attr', 'href', '/app/register')
    
    })
    
        //cons values 
        const  name = "Ian Interactive"
        const  user = "test_interactive3@passiv.com"
        const  pass = "Interactive12345"
    

    it('Registration success', () => {
        
        cy.get('[name=name]')
            .type(name)
        cy.get('[name=email]')
            .type(user)
            .should('have.value', user)
        cy.get('[placeholder=Password]')
            .type(pass)
            .should('have.value', pass)
    
        cy.server()
    
        cy.route('POST', 'localhost:3000/app/welcome').as('usersuccess')
        cy.get('form').submit()
    })
    
    
    it('Continue to dashboard', () => {
    
        cy.contains('Continue').click()
    
    })
    
    it('IBKR Redirect works', () => {

        cy.contains('IBKR').click({multiple: true})
    })

})