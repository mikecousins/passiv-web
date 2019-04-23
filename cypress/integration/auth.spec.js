describe('Auth', () => {
  it('login page loads', () => {
    cy.visit('https://passiv.netlify.com');
    cy.get('[data-cy=login-button]');
  });
});
