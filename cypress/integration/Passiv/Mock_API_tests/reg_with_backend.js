describe('Testing registration fields, button and signal sending', () => {
        it('Registration works and a signal is sent ', () => {

            cy.intercept('/api/v1/ping', (req) => { req.reply((res) => { res.send({  fixture: '/login_stubs/ping.json'})
          })
          })
          .as('Ping')

          cy.intercept('GET','v1', (req) => { req.reply({ fixture: '/login_stubs/v1.json' })
          })
          .as('V1')

          cy.intercept('/api/v1/help/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/help.json' })
          })
          })
          .as('Help')

          cy.intercept('POST', '/api/v1/auth/register/', req => {
            console.log('POST user info', req)
            body = req.body
        }).as('Save')

            cy.visit('/app/register', { responseTimeout: 310000 })

    // the variable for the info that will be stored in the JSON db
    let body


                cy.fixture('user').as('userFixture')
                cy.get('@userFixture').then(user => {
                cy.get('[name=name]').type(user.name)
                cy.get('[name=email]').first().type(user.email)
                cy.get('[placeholder=Password]').type(user.password)
                .get('form').submit()

            cy.wait('@Save')
            .then(({request, response}) => {
            expect(response.statusCode).to.eq(400)
            expect(request.body).to.have.property('email', user.email)
            expect(request.body).to.have.property('password', user.password)
            expect(request.method).to.eq('POST')


    })
  })

})
})
