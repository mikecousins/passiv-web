

describe('Updated test, Dec 2020', () => {
    it('Log in works without touching API', () => {

    cy.server();
    cy.route({
        url:"/api/v1/auth/login",
        method:"POST",
        status: 200,
        response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
    })

    

      cy.visit('localhost:3000/app/login')
      cy.location('pathname').should('equal', '/app/login')
  
      // enter valid username and password
      cy.get('[name=email]').type('Sincere@passiv.com')
      cy.get('[name=password]').type('test12345@')
      cy.contains('button', 'Sign In').click()
  

      cy.location('pathname').should('equal', '/app/dashboard')
      cy.contains('Total Holdings')
      .should('be.visible')


    })
  })