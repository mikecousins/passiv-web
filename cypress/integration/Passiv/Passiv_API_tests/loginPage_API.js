// Login Page 

describe('Login Test using XHR stubbing', function () {
    context('Login Functionality', () => {
            
        it('Login Does NOT Work', () => {

            cy.intercept('GET', '/api/v1', {
                response:'"version":1,"timestamp":"2020-12-03T15:48:22.119592Z","online":true'
                }).as('api')
                cy.intercept('POST', '/api/v1/auth/login', {
                    statusCode: 404
                }).as('login')
            cy.visit('/app/login')

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

        it('Login Does Work', () => {

            cy.intercept('GET', '/api/v1', {
            response:'"version":1,"timestamp":"2020-12-03T15:48:22.119592Z","online":true',
            request: 'http://localhost:3000/app/login?next=/app/dashboard'

            }).as('api')
            cy.intercept('POST', '/api/v1/auth/login', {
                statusCode: 202,
                response: {
                key: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNzk2NjI5MywiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDc1MzQyOTN9.FeoVWnIHnCTNhQ9sT3Tt4al62UXTrNtmyjitqSq2JbE' }
            }).as('login')

        
            cy.visit('/app/login')

            cy.get('[name=email]').type('alex.sutherland@getpassiv.com')
            cy.get('[name=password]').type('test12345@')
            cy.get('button[type=submit]').click()
                .visit('/app/dashboard')

        
        
        // Assertions for the tests; shows their validity
    
        cy.wait('@login')
        .then(({request, response}) => {
            expect(response.statusCode).to.eq(202)
            // expect(request.headers).to.have.property('Content-Type')
            expect(request.body).to.have.property('email', 'alex.sutherland@getpassiv.com')
            expect(request.body).to.have.property('password', 'test12345@')
            expect(request.method).to.eq('POST')
            // expect(response.reply).to.eq('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNzk2NjI5MywiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDc1MzQyOTN9.FeoVWnIHnCTNhQ9sT3Tt4al62UXTrNtmyjitqSq2JbE')
        })
        cy.wait('@api')
        .then(({request, response}) => {
            expect(request.headers.referer).to.eq('http://localhost:3000/app/login?next=/app/dashboard')
        })
    })
})
})
