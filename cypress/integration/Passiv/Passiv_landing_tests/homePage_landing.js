describe('Home Page works', () => {
    beforeEach( () => {  
    cy.visit('localhost:8000')

    cy.server()

    cy.route({
        url:"/api/v1/signups",
        method:"POST",
        status: 200,
        response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
    });
    
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
    cy.contains('Blog')
    .should('have.attr', 'href', '/blog/')
    .click()
    
    })    
    it('About button works', () => {
    cy.contains('About')
    .should('have.attr', 'href', '/about/')
    
    })    
    it('Pricing button works', () => {
    cy.contains('Pricing')
    .should('have.attr', 'href', '/pricing/')
    
    })    
    it('Security button works', () => {
    cy.contains('Security')
    .should('have.attr', 'href', '/security/')
    .click()

    })    
    it('Tutorials button works', () => {
    cy.contains('Tutorials')
    .should('have.attr', 'href', '/tutorials/')
    .click()

    })    
    it('Login button works', () => {
    cy.contains('Log in')
    .should('have.attr', 'href', '/app/login/')
    .click()
    
    })    
    it('Sign up button works', () => {
    cy.contains('Sign Up')
    .should('have.attr', 'href', '/app/register/')
    .click()


    })
})
