describe('Registration page accepts input', () => {

it('Sign up button works', () => {
cy.visit('https://passiv.com/app/login')
cy.contains('Sign Up').click()
.should('have.attr', 'href', '/app/register')

})
})
