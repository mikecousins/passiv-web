
describe('Database test', () => {
        it('Data is stored in correct format in JSON file', () => {

            cy.intercept('/api/v1/ping', (req) => { req.reply((res) => { res.send({  fixture: '/login_stubs/ping.json'})
          })
          })
          .as('Ping')

          cy.intercept('get','v1', (req) => { req.reply({ fixture: '/login_stubs/v1.json' })
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
                .then(() => {
                    cy.writeFile('cypress/fixtures/user.json', JSON.stringify (body, null, 2))
            })
          })

        it('Add Auth Token', () => {


          cy.intercept('/api/v1/ping', (req) => { req.reply((res) => { res.send({  fixture: '/login_stubs/ping.json'})
        })
        })
        .as('Ping')

        cy.intercept('get','v1', (req) => { req.reply({ fixture: '/login_stubs/v1.json' })
        })
        .as('V1')

        cy.intercept('/api/v1/help/', (req) => { req.reply((res) => { res.send({ fixture: '/login_stubs/help.json' })
        })
        })
        .as('Help')

        cy.intercept('/api/v1/auth/register/', (req) => { req.reply((res) => { res.send({ fixture: 'user.json' })
          })
        })



          cy.fixture('user').as('userFixture')
          cy.get('@userFixture').as('Save')
          cy.get('button').contains('Register').click()

        // Upon successful registration a token is assigned and stored in the json data base "user.json"

        cy.readFile('cypress/fixtures/user.json').then( obj => {
            cy.writeFile('cypress/fixtures/user.json', Object.assign(obj, {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNzk2NjI5MywiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDc1MzQyOTN9.FeoVWnIHnCTNhQ9sT3Tt4al62UXTrNtmyjitqSq2JbE"}))
        })
    })
  })


