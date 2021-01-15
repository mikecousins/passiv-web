
describe('Database test', () => {
        it('Data is stored in correct format in JSON file', () => {

                        //cons values 
            const  name = 'Alex Sutherland'
            const  email = 'testemail@passiv.com'
            const  pass = 'testpass12345@'    

        cy.visit('localhost:3000/app/register')
                let body

                cy.intercept('POST', '/api/v1/auth/register/', req => {
                    console.log('POST user info', req)
                    body = req.body
                }).as('Save')

                cy.intercept('GET', '/api/v1', { fixture: 'api_v1.json' })
                .as('API poke')

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
                cy.writeFile('cypress/fixtures/user.json', JSON.stringify (body, null, 2) 
                )       
                })
            })
        })


describe('Registration Test', () => {
        it('Registration works but does not create a new user', () => {
            
        cy.visit('localhost:3000/app/register')       
            

        cy.intercept('POST', '/api/v1/auth/register/', { fixture: 'user.json'} , {
            statusCode: 202,
            response: {
            name: '@name',
            email: '@email',
            password: ('@pass'),
            referralCode: ' ',
        }}).as('Success')

        cy.intercept('GET', '/api/v1', { fixture: 'api_v1.json' })
        .as('API poke')

                //cons values 
                const  name = 'Alex Sutherland'
                const  email = 'testemail@passiv.com'
                const  pass = 'testpass12345'

        cy.get('[name=name]')
                .type(name)
            .get('[name=email]')
                .type(email)
                .should('have.value', email)
            .get('[placeholder=Password]')
                .type(pass)
                .should('have.value', pass)
        cy.get('form').submit()

        // Upon successful registration a token is assigned and stored in the json data base "user.json"

        cy.readFile('cypress/fixtures/user.json').then( obj => {
            cy.writeFile('cypress/fixtures/user.json', Object.assign(obj, {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNzk2NjI5MywiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDc1MzQyOTN9.FeoVWnIHnCTNhQ9sT3Tt4al62UXTrNtmyjitqSq2JbE"}))
            })
        })
})

