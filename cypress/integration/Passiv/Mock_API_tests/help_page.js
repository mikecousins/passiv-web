    // it('Each redirecto works', () => {

    //
    //   cy.contains('Learn More').last().click().should('have.attr', 'href', 'https://go.compoundconfidence.com/passiv-community-discount')
    //   cy.contains('Learn More').eq(-2).click().should('have.attr', 'href', 'https://passiv.com/tutorials/')
    //   cy.contains('Learn More').eq(-3).click().should('have.attr', 'href', 'https://passiv.com/blog/');
    // });


    it('Email for help', () => {
      cy.visit('/help/' ,{ responseTimeout: 310000 })
      cy.intercept('POST', '/api/v1/auth/help', {
          statusCode: 200,
          body: 'it worked!'
      }).as('help')
      cy.intercept('POST', '/api/v1/feedback', {
          statusCode: 200,
          body: 'it worked!'
      }).as('email')
      cy.intercept('/api/v1/', {
        statusCode: 200,
        body: 'it worked!'
      }).as('api poke')



      cy.fixture('user').as('userFixture')
      cy.get('@userFixture').then(user => {
          cy.get('[name=le]').first().type(user.email)
          cy.get('[name=lm]').first().type("test")
      })

      cy.get('button').contains('Send Message').click()
    })
