describe('Auth', () => {
  it('login page loads', () => {
    cy.visit('/');
    cy.get('[data-cy=login-button]');
  });
});
