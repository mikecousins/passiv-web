// REgistration Page 

const { cy } = require("date-fns/locale")

describe('Create a new User', function () {
    context('Registration Functionality' , () => {
            
        it('Successful Registration', () => {

            cy.intercept('GET', '/api/v1', {
                response:'"version":1,"timestamp":"2020-12-03T15:48:22.119592Z","online":true'
                }).as('api')
                cy.intercept('POST', '/api/v1/auth/login', {
                    statusCode: 404
                }).as('login')
            cy.visit('/app/login')

            cy.get('[name=name]').type('Alex')
            cy.get('[name=email]').type('alex.sutherland@passiv.com')
            cy.get('[name=password]').type('5Browse8')
            cy.get('button[type=submit]').click()
            
    
        cy.wait('@login')
        .then(({request, response}) => {
            expect(response.statusCode).to.eq(404)
            expect(request.body).to.have.property('email', 'alex.sutherland@passiv.com')
            expect(request.body).to.have.property('password', '5Browse8')
            expect(request.method).to.eq('POST')
            
        })

    })

                //cons values 
    const  name = "Gerry General"
    const  email = "asdfas.cccccom"
    const  pass = "General12345"

            
        cy.get('[name=name]')
            .type(name)
        cy.get('[name=email]')
            .type(email)
            .should('have.value', email)
        cy.get('[placeholder=Password]')
            .type(pass)
            .should('have.value', pass)
        cy.contains('Register').click({multiple: true})
    })

})



