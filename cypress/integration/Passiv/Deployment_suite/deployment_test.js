
// Sidebar_test_live
describe('Sidebar individual component test', () => {

    it('Collapse button works', () => {
    cy.visit('https://passiv.com/app/login/')
    cy.contains('Collapse').click()
    })
    
    it('Expand button works', () => {
        cy.contains('Expand').click()
    })
        
    it('Sign up button works', () => {
        cy.contains('Sign Up').click()
        .should('have.attr', 'href', '/app/register')
    
    })
    
    it('Login button works', () => {
        cy.contains('Login').click()
        .should('have.attr', 'href', '/app/login')
    
    })
    
    it('Help button works', () => {
        cy.contains('Help').click()
        .should('have.attr', 'href', '/app/help')
    })
    
    it('Reset password button works', () => {
        cy.contains('Reset').click()
        .should('have.attr', 'href', '/app/reset-password')
    })

})
            
    // Login validity test
describe('Login individual component test', () => {
  
    it('accepts input email', () => {
        cy.visit('https://app.passiv.com/login')
        const typedtext = 'alex.sutherland@getpassiv.com'
        cy.get('[name=password]').click  
        cy.get('[name=email]')
        .type(typedtext)
        .should('have.value', typedtext)

        // Verify that the signin button disabled with email //
        cy.get('[data-cy=login-button]').should('be.disabled')
        
    })
        
    

    // Verify the sign in button is disabled without email //
    it('accepts input password', () => {
        cy.visit('https://app.passiv.com/login')
        const typedtext2 = '5browe8'
        cy.get('[placeholder=Password]')
        .type(typedtext2)   
        .should('have.value', typedtext2)
        cy.get('p').should('have.text', "An email is required.Forgot your password?Reset it!Don't have an account?Sign up!")

    cy.get('[data-cy=login-button]').should('be.disabled')

    })
        

    // Verify the error prompt works
    it('Error Prompt', () => {
        cy.visit('https://app.passiv.com/login')
        const typedtext = 'a.suds@unb.ca'
        const typedtext2 = '5Browe8'
        cy.get('[name=email]')
        .type(typedtext)
        .should('have.value', typedtext)
        cy.get('[placeholder=Password]')
        .type(typedtext2)
        .should('have.value', typedtext2)
        cy.get('[data-cy=login-button]').click()
        
        cy.get('p').should('have.text', "Unable to log in with provided credentials.Forgot your password?Reset it!Don't have an account?Sign up!")
    })

    // Login Success  
    it('Login test 1', () => {
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
    }) 


    // Re-login
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
            cy.get('div').find('input').contains('Search for security...')
            .click()
            .type('Tesla')


    })


})



    



