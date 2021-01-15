



describe('Login using created data from registration', () => {
    it('Log in Success', () => {

    // const variables
    const  name = 'Alex Sutherland'
    const  email = 'testemail@passiv.com'
    const  pass = 'testpass12345@'
    const  authtoken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNzk2NjI5MywiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDc1MzQyOTN9.FeoVWnIHnCTNhQ9sT3Tt4al62UXTrNtmyjitqSq2JbE'   

        cy.intercept('POST', '/api/v1/auth/login/', { fixture: 'user.json'})
      .as('Success')


        cy.intercept('GET', '/api/v1', { fixture: 'api_v1.json' })
      .as('API poke')
    
    cy.visit('localhost:3000/app/login')
    cy.location('pathname').should('equal', '/app/login')

    // enter valid username and password
    cy.get('[name=email]').type(email)
    cy.get('[name=password]').type(pass)
    cy.contains('button', 'Sign In').click()


    cy.location('pathname').should('equal', '/app/dashboard')
    cy.contains('Total Holdings')
    .should('be.visible')

    cy.wait('@Success')
    .then(({request, response}) => {
        expect(response.statusCode).to.eq(200)
        expect(response.body).to.have.property('name', name)
        expect(request.body).to.have.property('email', email)
        expect(request.body).to.have.property('password', pass)
        expect(request.method).to.eq('POST')
        expect(response.body.token).to.eq(authtoken)
    window.alert('Successfully logged in! Welcome to passiv!')
    })
  })
})
