    // Login validity test
    describe('Login individual component test', () => { 
        it('accepts input email', () => { 
            cy.fixture('testDomain').as('login')
            
            cy.get('@login').then(domain => {
            cy.visit((domain.test).concat('/login')) })
            cy.fixture('credentials').as('userFixture')
            cy.get('@userFixture').then(user => {
            cy.get('[name=email]').type(user.username)
            })
    
            // Verify that the signin button disabled with email //
            cy.get('[data-cy=login-button]').should('be.disabled')
            
        })
            
    
        // Verify the sign in button is disabled without email //
        it('accepts input password', () => {
            cy.fixture('testDomain').as('login')
            cy.get('@login').then(domain => {
            cy.visit((domain.test).concat('/login')) })
            cy.fixture('credentials').as('userFixture')
            cy.get('@userFixture').then(user => {
            cy.get('[placeholder=Password]').type(user.password)
            })
            cy.get('p').should('have.text', "An email is required.Forgot your password?Reset it!Don't have an account?Sign up!")
    
        cy.get('[data-cy=login-button]').should('be.disabled')
    
        })

        it('Login test 2', () => {
            cy.fixture('testDomain').as('login')
            cy.get('@login').then(domain => {
            cy.visit((domain.test).concat('/login')) })
            cy.fixture('credentials').as('userFixture')
            cy.get('@userFixture').then(user => {
            cy.get('[name=email]').first().type(user.username)
            cy.get('[placeholder=Password]').type(user.password)
            cy.get('form').submit()
            
        })
    })
})
            