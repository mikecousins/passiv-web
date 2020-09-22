
describe('Login Page Test', () => {
    const email ='a.suds@unb.ca'
    const pass = '5Browse8'
    beforeEach(() => {
        cy.server({force404: false})
        cy.visit('/app/login')
    })

    it('has the entry fields', () => {
    
        cy.contains('Email')
        cy.contains('Password')

    })

    it('test input of email and password', () => {
 
        cy.route({
            method: 'POST',
            url:'/api/v1/auth/login',
            status:400,
            response:{"non_field_errors":["Unable to log in with provided credentials."]}

        })   

    

        cy.get('input[name=email]').type(email)
        .should('have.value', email)
        cy.get('[data-cy=login-button]').should('be.disabled')
    

        cy.get('input[name=password').type(pass)
        .should('have.value', pass)
        cy.get('[data-cy=login-button]').should('not.be.disabled')

        cy.route({
            method: 'POST',
            url: '/api/v1/auth/token',
            response:{"token":"aBigLongAuthToken"}
            
        })




    })

});