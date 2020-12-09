describe('Registration Test', () => {
    it('Registration works but does not create a new user', () => {

   

    // cy.server();
    // cy.route({
    //     url:"/api/v1/auth/register/",
    //     method:"GET",
    //     status: 400,
    //     response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
    // });


    cy.intercept('GET','/api/v1', (req) => {
        req.reply()
    })

    cy.intercept('GET','register', (req) => {
        req.reply('success!')
    })

      cy.visit('/app/register')
            //cons values 
            const  name = "Gerry General"
            const  email = "GG2EZ29@passiv.com"
            const  pass = "General12345"
        
        cy.get('[name=name]')
            .type(name)
        cy.get('[name=email]')
            .type(email)
            .should('have.value', email)
        cy.get('[placeholder=Password]')
            .type(pass)
            .should('have.value', pass)
        cy.get('form').submit()
    
    
    })

})

