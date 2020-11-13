// Login test for Passiv website live site (Oct 2020) 
describe('Login individual component test', () => {
    beforeEach( () => {   cy.visit('localhost:3000/app/login')
    
    })

    it('accepts input email', () => {
        const typedtext = 'a.suds@unb.ca'

    //logout of previous instance 

        cy.get('[name=password]').click  
        cy.get('[name=email]')
        .type(typedtext)
        .should('have.value', typedtext)

      // Verify that the signin button disabled with email //
        cy.get('[data-cy=login-button]').should('be.disabled')
        
      
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

    it('Button works with email AND password', () => {
        const typedtext = 'a.suds@unb.ca'
        const typedtext2 = '5Browse8'
        cy.get('[name=email]')
        .type(typedtext)
        .should('have.value', typedtext)
        cy.get('[placeholder=Password]')
        .type(typedtext2)
        .should('have.value', typedtext2)
    
    // Verify the sign in button is enabled//
    cy.get('[data-cy=login-button]').should('not.be.disabled')
    
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

    // Login Form Submission tests 
    beforeEach(() => {
        cy.server()
    });    
    
    it('Login failed', () => {

        const user = 'a.suds@unb.ca'
        const fail = '5Browe8'
    
        

        cy.route({
            url:"/api/v1/auth/login",
            method:"POST",
            status: 500,
            response: {"non_field_errors":["Unable to log in with provided credentials."]},
            // Ons: "Log in Success!"
        });

    
        cy.get('[name=email]')
        .type(user)
        .should('have.value', user)
        cy.get('[placeholder=Password]')
        .type(fail)
        .should('have.value', fail)
        cy.get('[data-cy=login-button]').click()
    })

    it('Login Success', () => {
    
            const user = 'alex.sutherland@getpassiv.com'
            const pass = '5Browse8'
        
          
        
                cy.server()
        
                cy.route({
                    url:"/api/v1/auth/login",
                    method:"POST",
                    status: 200,
                    response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
                });
            
                cy.route({
                    url:"/api/v1/currencies",
                    method:"GET",
                    status: 200,
                    response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
                });
            
                cy.route({
                    url:"/api/v1/features",
                    method:"GET",
                    status: 200,
                    response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
                });
            
                cy.route({
                    url:"/api/v1/incentives",
                    method:"GET",
                    status: 200,
                    response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
                });
            
                cy.route({
                    url:"/api/v1/brokerages",
                    method:"GET",
                    status: 200,
                    response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
                });
            
                cy.route({
                    url:"/api/v1/subscriptions",
                    method:"GET",
                    status: 200,
                    response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
                });
            
                cy.route({
                    url:"/api/v1/authorizations",
                    method:"GET",
                    status: 200,
                    response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
                });
            
                cy.route({
                    url:"/api/v1/accounts",
                    method:"GET",
                    status: 200,
                    response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
                });
            
                cy.route({
                    url:"/api/v1/portfolioGroups",
                    method:"GET",
                    status: 200,
                    response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
                });
            
                cy.route({
                    url:"/api/v1/settings",
                    method:"GET",
                    status: 200,
                    response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
                });
            
                cy.route({
                    url:"/api/v1/plans",
                    method:"GET",
                    status: 200,
                    response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
                });
        
        cy.visit('localhost:3000/app/login')        
        cy.get('[name=email]')
        .type(user)
        .should('have.value', user)
        cy.get('[placeholder=Password]')
        .type(pass)
        .should('have.value', pass)
        cy.get('[data-cy=login-button]').click()

        cy.get('nav').contains('Logout')
        .click()
    

    })

    
})

