describe('Auth', () => {
  const email = 'shayanabedi.dev@gmail.com'
  const password = 'S2281483347h'
  const invalidEmail = 'email@gmail.com'
  const invalidPassword = '12345'
  beforeEach(() => {
    cy.visit("/")
  });
  it("Email and password fields accept input And button is enabled", () => {
    // test email field
    cy.get('[name=email]').type(email).should("have.value", email)
    // test password field 
    cy.get('[name=password]').type(password).should("have.value", password)
    // test if button is enabled 
    cy.get('[data-cy=login-button]').should('not.be.disabled')
  })
  it("Button disabled if enter not an email", () => {
    cy.get('[name=email]').type('not an email')
    cy.get('[name=password]').type(invalidPassword)
    cy.get('[data-cy=login-button]').should('be.disabled')
  })
  it("Button disabled if password field empty", () => {
    cy.get('[name=email]').type(email)
    cy.get('[data-cy=login-button]').should('be.disabled')
  })

  context('Login form submission test', () => {
    beforeEach(() => {
      cy.server()
    });
    // Failed login stub
    it("Failed login stub", () => { 
    cy.route({
      url: "/api/v1/auth/login",
      method: "POST",
      status: 500,
      response: {"non_field_errors":["Unable to log in with provided credentials."]}
    });
    cy.get('[name=email]').type(invalidEmail)
    cy.get('[name=password]').type(invalidPassword)
    cy.get('[data-cy=login-button]').click()
    cy.contains('Unable to log in with provided credentials.')
  })
    // Successful login stub
    it("Successful login stub", () => { 
      cy.route({
        url: "/api/v1/auth/login",
        method: "POST",
        status: 200,
        // response: {"token":"aBigLongAuthToken"}
      });
      cy.get('input[name=email]').type(email)
      cy.get('input[name=password').type(password)
      cy.get('[data-cy=login-button]').click()
      cy.contains('Welcome to Passiv!')
    })
  })
});

