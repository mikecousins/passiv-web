
describe('Registration Test', () => {

    it('Register new account ', () => {
        // redirect for any other domains
        
        cy.fixture('testDomain').as('login')
        cy.get('@login').then(domain => {
        cy.visit((domain.test).concat('/registration')) })
        cy.fixture('credentials').as('userFixture')
        cy.get('@userFixture').then(user => {
        cy.get('[name=name').type('Al')
        cy.get('[name=email]').first().type(user.username)
        cy.get('[placeholder=Password]').type(user.password)})
    })
})
