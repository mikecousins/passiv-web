describe('Login Page Test for successfull and insuccessful login', () => {
    const email ='a.suds@unb.ca'
    const pass = '5Browse8'
    const incpass = '1234abc'
    beforeEach(() => {
        cy.server({force404: false})
        cy.visit('/app/login')
    })

// Contains the entry fields requested 
    it('has the entry fields', () => {
    
        cy.contains('Email')
        cy.contains('Password')

    })

    // A successful login request
    it.only('Successfull login', () => {
        cy.route({
            method: 'POST',
            url: '/api/v1/auth/login',
            response:{"token":"aBigLongAuthToken"}
            
        })
 
        cy.get('input[name=email]').type(email)
        .should('have.value', email)
        cy.get('[data-cy=login-button]').should('be.disabled')
    

        cy.get('input[name=password').type(pass)
        .should('have.value', pass)
        cy.get('[data-cy=login-button]').should('not.be.disabled')

        cy.url().should('include', '/app/welcome')

    })

    // An unsuccessful login request
    it.only('Error on login', () => {
        cy.route({
         method: 'POST',
         url:'/app/login',
         status:400,
         response:{'non_field_errors':['Unable to log in with provided credentials.']}
        }).as('call')

        
        cy.get('input[name=email]').type(email)
        .should('have.value', email)
        cy.get('[data-cy=login-button]').should('be.disabled')
    

        cy.get('input[name=password').type(incpass)
        .should('have.value', incpass)
        cy.get('[data-cy=login-button]').should('not.be.disabled')

        cy.wait('@call')

        cy.get('p.error').should('be.visible').and('contain', 'Unable to log in with provided credentials.')

        cy.url().should('include', '/app/welcome')

    })


    })