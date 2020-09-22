
describe('Login Page Test', () => {
  const email = ' '
  const pass = ' '
  beforeEach(() => {
      cy.server()
      cy.visit('/app/login')
  })

  it('has the entry fields', () => {
  
      cy.contains('Email')
      cy.contains('Password')

  })

  it('test input of email and password', () => {
      cy.route({
          method: 'POST',
          url:'/api/v1/auth/login',
          status:400,
          response:{"non_field_errors":["Unable to log in with provided credentials."]}

      })



      cy.get('input[name=email]').type(email)
      cy.get('input[name=password').type(pass)
      cy.get('[data-cy=login-button]').click

  })

});


