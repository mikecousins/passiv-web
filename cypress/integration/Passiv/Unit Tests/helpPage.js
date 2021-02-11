
it('Email for help', () => {
    cy.intercept('POST', '/api/v1/auth/help', {
        statusCode: 200,
        body: 'it worked!'
    }).as('help')
    cy.intercept('POST', '/api/v1/feedback', {
        statusCode: 200,
        body: 'it worked!'
    }).as('email')
    cy.fixture('testDomain').as('server')
    cy.get('@server').then(domain => {
    cy.visit((domain.test).concat('/help')) })
    cy.fixture('credentials').as('userFixture')
    cy.get('@userFixture').then(user => {
        cy.get('[name=le]').first().type(user.username)
        cy.get('[name=lm]').first().type("test")
    cy.get('button').contains('Submit').click()
    cy.wait('@email')
    

    })

})