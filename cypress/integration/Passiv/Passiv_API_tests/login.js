describe ('Logging in using XHR request', function () {
    const email = 'alex.sutherland@passiv.com'
    const password = 'test12345@'

    it('can bypass the UI and login', function () {
        cy.visit('localhost:3000/app')
        cy.request({
            method: 'GET',
            url: 'localhost:3000/app',
            body: {
                email,
                password,
            },
        })

    cy.get('[name=email]').type('alex.sutherland@passiv.com')
      cy.get('[name=password]').type('test12345@')
      cy.contains('button', 'Sign In').click()

    cy.getCookie('csrftoken').should('exist')

    cy.visit('/app/dashboard/')
    })
})

