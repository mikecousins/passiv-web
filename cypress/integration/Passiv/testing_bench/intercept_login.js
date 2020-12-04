describe('Updated test, Dec 2020', () => {
    it('Log in works without touching API using Intercept feature', () => {
      cy.intercept('POST','/api/v1/auth/login/', (req) => {
        req.reply((res) => {
          res.send({ fixture: 'passiv_stub_base.js'})
        })
      cy.intercept('login', {fixture : 'passiv_stub_base.js'})

      })


      cy.visit('localhost:3000/app/login')
      cy.location('pathname').should('equal', '/app/login')
  
      // enter valid username and password
      cy.get('[name=email]').type('Sincere@passiv.com')
      cy.get('[name=password]').type('test12345@')


      cy.contains('button', 'Sign In')
  

      cy.location('pathname').should('equal', '/app/')
      cy.contains('Total Holdings')
      .should('be.visible')

  })       
      
    })
  