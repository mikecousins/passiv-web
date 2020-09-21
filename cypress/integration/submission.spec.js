
describe('Login Page Test', () => {
    const email ='a.suds@unb.ca'
    const pass = '5Browse8'
    beforeEach(() => {
        cy.visit('/app/login')
    })

    it('has the entry fields', () => {
    
        cy.contains('Email')
        cy.contains('Password')

    })

    it('test input of email and password', () => {
        cy.get('input[name=email]').type(email)
        cy.get('input[name=password').type(pass)
        cy.get('[data-cy=login-button]').click

        cy.server({
            method: 'POST',
            response:{"token":"aBigLongAuthToken"}
        })
        
        cy.route('/app/login', {errors: "unable to login with provided credentials"})
    })
})