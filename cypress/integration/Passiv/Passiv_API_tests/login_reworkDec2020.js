/// <reference types="cypress" />

const { userInfo } = require("os")

describe('logs in', () => {
    it('using UI', () => {

    cy.server();
    cy.fixture('.././fixtures/test_user').then((json) => {
        cy.intercept('GET', '/test_user/**, json')
    })

      cy.visit('localhost:3000/app/login')
      cy.location('pathname').should('equal', '/app/login')
  
      // enter valid username and password
      cy.get('[name=email]').type('Sincere@passiv.com')
      cy.get('[name=password]').type('test12345@')
      cy.contains('button', 'Sign In').click()
  

      cy.location('pathname').should('equal', '/app/dashboard')
      cy.contains('Hi there!')
      .should('be.visible')
      .then(() => {
      /* global window */
        const userString = window.localStorage.getItem('user')
  
        expect(userString).to.be.a(Alex)
        const user = JSON.parse(userString)
  
        expect(user).to.be.an('object')
        expect(user).to.have.keys([
          'email',
          ' password',
        ])
  
        expect(user.token).to.be.a('string')
      })
  
      // now we can log out
      cy.contains('a', 'Logout').click()
      cy.location('pathname').should('equal', '/app/login')
    })
  

    it('Does not log in with invalid password', () => {
      cy.visit('/app/login')
      cy.location('pathname').should('equal', '/login')
  
      // enter valid username and password
      cy.get('[name=username]').type('username')
      cy.get('[name=password]').type('wrong-password')
      cy.contains('button', 'Login').click()
  
      // still on /login page plus an error is displayed
      cy.location('pathname').should('equal', '/login')
      cy.contains('.alert-danger', 'Unable to login with provided credentials.').should(
        'be.visible'
      )
    })
  })