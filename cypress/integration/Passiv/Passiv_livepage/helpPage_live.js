describe('Help page accepts input', () => {

it('Help button works', () => {
    cy.visit('https://passiv.com/app/login/')
    cy.contains('Help').click()
    .should('have.attr', 'href', '/app/help')
})

it('Test Help inquiry box works', () => {
    cy.get('[name=le]')
    .type('asutherland8219@hotmail.com')

    cy.get('[name=lm]')
    .type('This is a test')

    cy.get('form')
    .submit()
})

})
