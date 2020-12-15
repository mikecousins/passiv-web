describe('Registration Test', () => {
    it('Registration works but does not create a new user', () => {
        
    cy.visit('localhost:3000/app/register')
        
    cy.intercept('POST', '/api/v1/auth/register/', {
        statusCode: 202,
        response: {
        name: '@name',
        email: '@email',
        password: ('@pass'),
        referralCode: ' ',
    }}).as('Success')



            //cons values 
            const  name = 'Alex Sutherland'
            const  email = 'testemail@passiv.com'
            const  pass = 'testpass12345'
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
})


describe('Database test', () => {
        it('Data is stored in correct format in JSON file', () => {

                        //cons values 
            const  name = 'Alex Sutherland'
            const  email = 'testemail@passiv.com'
            const  pass = 'testpass12345'

        cy.visit('localhost:3000/app/register')
                let body
                cy.intercept('POST', '/api/v1/auth/register/', req => {
                    console.log('POST user info', req)
                    body = req.body
                }).as('Save')
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
            })
        })
    })