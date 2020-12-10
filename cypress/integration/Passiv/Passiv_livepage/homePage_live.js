describe('Home Page works', () => {
    beforeEach( () => {  
    cy.visit('https://passiv.com/')
    })
    
    it('Email box works', () => {
    const typedtext = 'a.suds@unb.ca'
    cy.get('[name=email]')
    .type(typedtext)
    .should('have.value', typedtext)
    cy.get('[type=submit]')
    .click()
    })

    it('Blog button works', () => {
    cy.contains('Blog').click()
    .should('have.attr', 'href', '/blog/')
    
    })    
    it('About button works', () => {
    cy.contains('About').click()
    .should('have.attr', 'href', '/about/')
    
    })    
    it('Pricing button works', () => {
    cy.contains('Pricing').click()
    .should('have.attr', 'href', '/pricing/')
    
    })    
    it('Security button works', () => {
    cy.contains('Security').click()
    .should('have.attr', 'href', '/security/')
    
    })    
    it('Tutorials button works', () => {
    cy.contains('Tutorials').click()
    .should('have.attr', 'href', '/tutorials/')
    
    })    
    it('Login button works', () => {
    cy.contains('Log in')
    .should('have.attr', 'href', '/app/login/')
    .click()
    
    })    
    it('Sign up button works', () => {
    cy.contains('Sign Up').click()
    .should('have.attr', 'href', '/app/register/')
    
    })
})
