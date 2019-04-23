context('Auth', () => {
  it('login page loads', () => {
    cy.visit('https://beta.getpassiv.com');
    cy.get('[data-cy=login-button]');
  });
});
