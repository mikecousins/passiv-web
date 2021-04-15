
describe('Database test', () => {
        it('Data is stored in correct format in JSON file', () => {

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
                //cons values
                const  name = 'Alex Sutherland'
                const  email = 'testemail@passiv.com'
                const  pass = 'passivtestpass'

                cy
                .get('[name=name]')
                    .type(name)
                .get('[name=email]')
                    .type(email)
                    .should('have.value', email)
                .get('[name=password]')
                    .type(pass)
                    .should('have.value', pass)
                .get('form').submit()
          
    })
  })


