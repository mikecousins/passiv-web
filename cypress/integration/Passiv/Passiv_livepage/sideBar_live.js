// Sidebar_test_live
describe('Sidebar individual component test', () => {

it('Collapse button works', () => {
cy.visit('https://passiv.com/app/login/')
cy.contains('Collapse').click()
})

it('Expand button works', () => {
    cy.contains('Expand').click()
})
    
it('Sign up button works', () => {
    cy.contains('Sign Up').click()
    .should('have.attr', 'href', '/app/register')

})

it('Login button works', () => {
    cy.contains('Login').click()
    .should('have.attr', 'href', '/app/login')

})

it('Help button works', () => {
    cy.contains('Help').click()
    .should('have.attr', 'href', '/app/help')
})

it('Reset password button works', () => {
    cy.contains('Reset').click()
    .should('have.attr', 'href', '/app/reset-password')
})
})
        