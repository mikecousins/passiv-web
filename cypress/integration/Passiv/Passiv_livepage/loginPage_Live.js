// Login test for Passiv website live site (Oct 2020) 
describe('Login individual component test', () => {
    beforeEach( () => {  
        cy.visit('https://passiv.com/app/login/')

    
    it('Button works with email AND password', () => {
        const typedtext = 'alex.sutherland@getpassiv.com'
        const typedtext2 = '5Browse8'
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

    it('Continue to dashboard', () => {

        cy.contains('Continue').click()
    })

    it("New user no Brokerage", () => {
        cy.contains("don't").click()

    })
    it('Logout works', () => {
        cy.get('nav').contains('Logout')
        .click()

    })


    it('accepts input email', () => {
        const typedtext = 'alex.sutherland@getpassiv.com'
        cy.get('[name=password]').click  
        cy.get('[name=email]')
        .type(typedtext)
        .should('have.value', typedtext)

        // Verify that the signin button disabled with email //
        cy.get('[data-cy=login-button]').should('be.disabled')
        
    })
        
        })
        
    

    // Verify the sign in button is disabled without email //
    it('accepts input password', () => {
        const typedtext2 = 'Mancity2021Champs'
        cy.get('[placeholder=Password]')
        .type(typedtext2)   
        .should('have.value', typedtext2)
        cy.get('p').should('have.text', "An email is required.Forgot your password?Reset it!Don't have an account?Sign up!")

    cy.get('[data-cy=login-button]').should('be.disabled')
        
    })

    // Verify the error prompt works
    it('Error Prompt', () => {
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

})




    // Test link redirects ** Page links cannot be isolated as items and properly tested **

    //it('Successful reset pass redirect', () => {
      //cy.get('div').should('have.text', 'Reset it')
       // cy.location('div').should('eq','/app/reset-password')
        //})

    
    //it('Successful sign-up redirect', () => {
        //cy.get('p').should('have.text', 'Sign up!')}
