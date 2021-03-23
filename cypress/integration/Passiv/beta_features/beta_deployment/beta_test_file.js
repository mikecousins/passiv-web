describe('Test Brokerage Auth Connections', () => { 
  beforeEach(() => {

    cy.intercept('/api/v1/brokerages/**', (req) => {
      req.reply({fixture: 'login_stubs/brokerages.json'})
    }).as('connect')
  
  })
 

  it('Login test 2', () => {
    cy.fixture('betatestDomain').as('login')
    cy.get('@login').then(domain => {
    cy.visit((domain.test).concat('/login')) 
  })
    cy.fixture('my_credentials').as('userFixture')
    cy.get('@userFixture')
    .then(user => {
    cy.get('[name=email]').first().type(user.username)
    cy.get('[placeholder=Password]').type(user.password)
    })

  })
  // Verify the sign in button is enabled//
    cy.get('[data-cy=login-button]').should('not.be.disabled')
    .click({multiple:true})

    cy.click('Allocate')
    cy.assert().contains('Trades')

    cy.contains('Portfolio').click().wait(8000)
    cy.contains('Overview').click()

    cy.scrollTo('bottom')
    cy.get('button').contains('Edit Model').wait(4000).click()

  //changing asset allocation so portfolio balances
    cy.get('button=times')
    .type('{enter}')
    cy.get('input').eq(0).click().clear().type(5)


  // add TSLA at 1% portfolionpx 
    cy.contains('Add').click()  
    cy.scrollTo('bottom')
    cy.get('input').last().wait(3000).click().clear().type('1')
    cy.get('input').eq(3)
    .click().type('TSLA').type('{enter}')
  
  // add Amazon to portfolio at 5%
    cy.contains('Add').click()
    cy.scrollTo('bottom')
    cy.get('input').last().wait(3000).click().clear().type('5')
    cy.get('input').eq(5).click().type('AMZN').type('{enter}')
  
  //save portfolio  
    cy.get('button').contains('Save').click()
    cy.get('button').contains('Refresh').click()  
    cy.fixture('testDomain').as('login')
    cy.get('@login').then(domain => {
    cy.visit(domain.test)}) 
    
    })
  

