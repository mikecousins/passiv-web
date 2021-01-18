



describe('Login using created data from registration', () => {
    it('Log in Success', () => {

        cy.intercept('POST', '/api/v1/auth/login/', { fixture: 'user.json'})
      .as('Success')


        cy.intercept('GET', '/api/v1', { fixture: 'api_v1.json' })
      .as('API poke')
    
      cy.fixture('testDomain').as('login')
      cy.get('@login').then(domain => {
      cy.visit((domain.test).concat('/login')) })
    cy.location('pathname').should('equal', '/app/login')

    // enter valid username and password
    cy.fixture('user').as('userFixture')
    cy.get('@userFixture').then(user => {
    cy.get('[name=email]').first().type(user.email)
    cy.get('[placeholder=Password]').type(user.password)
    .get('form').submit()


    cy.location('pathname').should('equal', '/app/dashboard')
    cy.contains('Total Holdings')
    .should('be.visible')

    cy.wait('@Success')
    .then(({request, response}) => {
        expect(response.statusCode).to.eq(200)
        expect(response.body).to.have.property('name', user.name)
        expect(request.body).to.have.property('email', user.email)
        expect(request.body).to.have.property('password', user.password)
        expect(request.method).to.eq('POST')
        expect(response.body.token).to.eq(user.token)
    window.alert('Successfully logged in! Welcome to passiv!')

    cy.location('pathname').should('eq', '/app/dashboard')
    })
  })
})
})