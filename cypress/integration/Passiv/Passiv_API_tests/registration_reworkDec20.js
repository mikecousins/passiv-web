
describe('Registration Test', () => {
    it('Registration works but does not create a new user', () => {
        let body
        
    cy.visit('localhost:3000/app/register')
    
    cy.intercept('POST', '/api/v1/auth/register', req => {
        console.log('POST /api/v1/auth/register', req)
        body = req.body
    }).as('User')

    

            //cons values 
            const  name = "Gerry General"
            const  email = "GG2EZ29@passiv.com"
            const  pass = "General12345"
        
        cy
        .get('[name=name]')
            .type(name)
        .get('[name=email]')
            .type(email)
            .should('have.value', email)
        .get('[placeholder=Password]')
            .type(pass)
            .should('have.value', pass)
           
        cy.get('form').submit()
        .then(() => {
            cy.writeFile('cypress/fixtures/user.json', JSON.stringify(body, null, 2))
        })

    cy.server()
    .then(() => {
        cy.fixture("user.json").as("response")
        cy.route( '/api/v1', '@response')
        
    })

        
    
    
    })

})