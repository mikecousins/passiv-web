describe('Login using created data from registration', () => {
    it('asset class tests' , () => {
        cy.fixture('testDomain').as('login')
        cy.get('@login').then(domain => {
        cy.visit((domain.test).concat('/login')) })

        cy.fixture('credentials').as('userFixture')
        cy.get('@userFixture').then(user => {
        cy.get('[name=email]').first().type(user.username)
        cy.get('[placeholder=Password]').type(user.password)
        .get('form').submit().as('login').wait(4000)

        cy.get("aside").find('div').contains('My').click()
        cy.get('button').contains('Edit').click()


    })

})
})