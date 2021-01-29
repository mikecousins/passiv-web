describe('New User Registration Success', () => {

    it('Sign up button works', () => {
    cy.visit('localhost:3000/app')
    cy.contains('Sign Up').click({multiple: true})
    .should('have.attr', 'href', '/app/register')
    
    })
    
        //cons values 
        const  name = "Terrence TD"
        const  user = "test_td3@passiv.com"
        const  pass = "Ameritrade12345"
    

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
    
    it('TD Ameritrade Redirect works', () => {

        cy.contains('TD Ameritrade').click({multiple: true})
    })

})