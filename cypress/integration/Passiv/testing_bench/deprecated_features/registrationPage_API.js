// REgistration Page 
describe('Create a new User', function () {
    context('Registration Functionality' , () => {
            
        it('Successful Registration', () => {

            cy.intercept('GET', '/api/v1', {
                response:'"version":1,"timestamp":"2020-12-03T15:48:22.119592Z","online":true'
                }).as('api')

            cy.intercept('get', '/api/v1/auth/register', 
                req.reply({
                    statusCode: 606
                })).as('register')
        

            cy.intercept('POST', '/api/v1/auth/login', {
                statusCode: 202,
                response: {
                key: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNzk2NjI5MywiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDc1MzQyOTN9.FeoVWnIHnCTNhQ9sT3Tt4al62UXTrNtmyjitqSq2JbE' }
            }).as('login')            
        
            cy.visit('/app/register')

            cy.get('[name=name]').type('Alex')
            cy.get('[name=email]').type('alex.sutherland@passiv.com')
            cy.get('[name=password]').type('5Browse8')
            cy.get('button[type=submit]').click()
         

        cy.wait('@register')
        .then(({request, response}) => {
            expect(response.statusCode).to.eq(606)
            expect(request.body).to.have.property('email', 'alex.sutherland@passiv.com')
            expect(request.body).to.have.property('password', '5Browse8')
            expect(request.method).to.eq('POST')
        })
    })

})})





