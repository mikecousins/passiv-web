// Sidebar_test_live
describe('Sidebar individual component test', () => {

    it('Collapse button works', () => {
        cy.fixture('testDomain').as('server')
        cy.get('@server').then(domain => {
        cy.visit(domain.test) })
    cy.contains('Collapse').click()
    })
    
    it('Expand button works', () => {
        cy.contains('Expand').click()
    })
        
    it('Sign up button works', () => {
        cy.contains('Sign Up').click()
        .should('have.attr', 'href', '/app/register')
    
    })
    
    it('Login button works', () => {
        cy.contains('Login').click()
        .should('have.attr', 'href', '/app/login')
    
    })
    
    it('Help button works', () => {
        cy.contains('Help').click()
        .should('have.attr', 'href', '/app/help')
    })
    
    it('Reset password button works', () => {
        cy.contains('Reset').click()
        .should('have.attr', 'href', '/app/reset-password')
    
    it('Login button works', () => {
        cy.contains('Login').click()
        .should('have.attr', 'href', '/app/login')
    })

        cy.clearCookies()
    })

})
            
    // Login validity test
describe('Login individual component test', () => { 
    it('accepts input email', () => { 
        cy.fixture('testDomain').as('login')
        
        cy.get('@login').then(domain => {
        cy.visit((domain.test).concat('/login')) })
        cy.fixture('credentials').as('userFixture')
        cy.get('@userFixture').then(user => {
        cy.get('[name=email]').type(user.username)
        })

        // Verify that the signin button disabled with email //
        cy.get('[data-cy=login-button]').should('be.disabled')
        
    })
        

    // Verify the sign in button is disabled without email //
    it('accepts input password', () => {
        cy.fixture('testDomain').as('login')
        cy.get('@login').then(domain => {
        cy.visit((domain.test).concat('/login')) })
        cy.fixture('credentials').as('userFixture')
        cy.get('@userFixture').then(user => {
        cy.get('[placeholder=Password]').type(user.password)
        })
        cy.get('p').should('have.text', "An email is required.Forgot your password?Reset it!Don't have an account?Sign up!")

    cy.get('[data-cy=login-button]').should('be.disabled')

    })
        

    // Verify the error prompt works
    it('Error Prompt', () => {
        cy.fixture('testDomain').as('login')
        cy.get('@login').then(domain => {
        cy.visit((domain.test).concat('/login')) })
        cy.fixture('credentials').as('userFixture')
        cy.get('@userFixture').then(user => {
        cy.get('[name=email]').type(user.username)
        cy.get('[placeholder=Password]').type('5browed8')
        })
        cy.get('[data-cy=login-button]').click()
        
        cy.get('p').should('have.text', "Unable to log in with provided credentials.Forgot your password?Reset it!Don't have an account?Sign up!")

    })

    //Send pass reset email 
    
    it('Reset Pass works', () => {
        cy.intercept('POST', '/api/v1/auth/resetPassword/', {
            statusCode: 200,
            body: 'it worked!'
        }).as('Reset')
        cy.intercept('https://app.passiv.com/app/reset-password').as('redirect')
        cy.fixture('testDomain').as('server')
        cy.get('@server').then(domain => {
        cy.visit((domain.test).concat('/reset-password')) })
        cy.get('input').click({multiple:true}).type('asutherland8219@gmail.com')
        cy.get('button').contains('Reset').click()
        cy.wait('@Reset')


    })

    it('Email for help', () => {
        cy.intercept('POST', '/api/v1/auth/help', {
            statusCode: 200,
            body: 'it worked!'
        }).as('help')
        cy.intercept('POST', '/api/v1/feedback', {
            statusCode: 200,
            body: 'it worked!'
        }).as('email')
        cy.fixture('testDomain').as('server')
        cy.get('@server').then(domain => {
        cy.visit((domain.test).concat('/help')) })
        cy.fixture('credentials').as('userFixture')
        cy.get('@userFixture').then(user => {
            cy.get('[name=le]').first().type(user.username)
            cy.get('[name=lm]').first().type("test")
        cy.get('button').contains('Submit').click()
        cy.wait('@email')
        
    
        })

    })


describe('Conditional Login Test', () => {

    it('User will log in and continue; non user registers new account', () => {
        // redirect for any other domains
        
        cy.fixture('testDomain').as('login')
        cy.get('@login').then(domain => {
        cy.visit((domain.test).concat('/login')) })
        cy.fixture('credentials').as('userFixture')
        cy.get('@userFixture').then(user => {
        cy.get('[name=email]').type(user.username)
        cy.get('[placeholder=Password]').type(user.password)
        })

    cy.get('[data-cy=login-button]').then(($button) => {
        if (cy.get($button).click().should('be.disabled') ){
            cy.fixture('testDomain').as('server')
            cy.get('@server').then(domain => {
            cy.get('div').contains('Sign Up').click()})
            cy.fixture('credentials').as('userFixture')
                cy.get('@userFixture').then(user => {
                cy.get('[name=name').type('Al')
                cy.get('[name=email]').first().type(user.username)
                cy.get('[placeholder=Password]').type(user.password)})

    } else {

        cy.fixture('testDomain').as('login')
        cy.get('@login').then(domain => {
        cy.visit((domain.test).concat('/register')) })
        cy.fixture('credentials').as('userFixture')
        cy.get('@userFixture').then(user => {
        cy.get('[name=email]').type(user.username)
        cy.get('[placeholder=Password]').type(user.password)})

    }
})

describe('Login and Adjust portfolio', () => {

    // Re-login
    it('Login test 2', () => {
        cy.fixture('testDomain').as('login')
        cy.get('@login').then(domain => {
        cy.visit((domain.test).concat('/login')) })
        cy.fixture('credentials').as('userFixture')
        cy.get('@userFixture').then(user => {
        cy.get('[name=email]').first().type(user.username)
        cy.get('[placeholder=Password]').type(user.password)

    // Verify the sign in button is enabled//
    cy.get('[data-cy=login-button]').should('not.be.disabled')
    .click({multiple:true})
    }) 
        cy.contains('Individual TFSA').click()
        cy.contains('Overview').click().wait(8000)
        cy.scrollTo('bottom')
        cy.get('button').contains('Edit Targets').wait(4000).click()
    //changing asset allocation so portfolio balances
    cy.get('input').eq(0).click().clear().type(15)

// add TSLA at 1% portfolio
    cy.contains('Add').click()
    cy.scrollTo('bottom')
        cy.get('input').last().wait(3000).click().clear().type('1')
        cy.get('input').eq(16)
        .click().type('TSLA').type('{enter}')

// add Amazon to portfolio at 5%
    cy.contains('Add').click()
    cy.scrollTo('bottom')
        cy.get('input').last().wait(3000).click().clear().type('5')
        cy.get('input').eq(17).click().type('AMZN').type('{enter}')
       

//save portfolio
    cy.get('button').contains('Save').click()
    cy.get('button').contains('Refresh').click()  
    cy.fixture('testDomain').as('login')
        cy.get('@login').then(domain => {
        cy.visit(domain.test)})  
    
})


})

describe('Reset and build portfolio manually', () => { 
    it('Reset', () => {
        cy.contains('Individual TFSA').click()  
        cy.contains('Overview').click().wait(8000)     
        cy.scrollTo('bottom')
        cy.get('button').contains('Edit Targets').click()
        cy.get('button').contains('Reset').click().wait(15000)

        
        cy.visit('https://app.passiv.com/app')
        cy.contains('Individual TFSA').click()
        cy.contains('Overview').click().wait(8000)
        cy.scrollTo('bottom')


        cy.get('button').contains('Build').click()

        // add TSLA at 1% portfolio
        cy.get('input').last().wait(3000).click().clear().type('1')
        cy.get('input').eq(0)
        .click().type('TSLA').type('{enter}')

// add Amazon to portfolio at 5%
    cy.contains('Add').click()
    cy.scrollTo('bottom')
        cy.get('input').last().wait(3000).click().clear().type('5')
        cy.get('input').eq(1).click().type('AMZN').type('{enter}')
    
    cy.contains('Add').click()
    cy.scrollTo('bottom')
        cy.get('input').last().wait(3000).click().clear().type('5')
        cy.get('input').eq(2).click().type('VGRO.TO').type('{enter}')
    
    cy.contains('Add').click()
    cy.scrollTo('bottom')
        cy.get('input').last().wait(3000).click().clear().type('5')
        cy.get('input').eq(3).click().type('AAPL').type('{enter}')


        cy.scrollTo('bottom')
        cy.get('button').contains('Save').click().as('save').wait(4000)
        cy.scrollTo('bottom')
        cy.get('button').contains('Edit Targets').wait(4000).click()
        cy.get('button').contains('Reset').click().wait(8000)
        cy.get('button').contains('Import').click().wait(8000)



    })

    })

})

    it('Goals Test', () => {
            cy.contains('Goals').click()
            .should('have.attr', 'href', '/app/goals')
    })


    //these are the values for the goal
    const goal1 = "Get the bag"
    const goalnumber = "1000000"
    const month = "July"
    const year = "2050"

    const goal2 = "Get the bread"
    const goalnumber2 = "10000000"



    it('Create a goal name', () => {
        cy.get('[id=goalname]')
        .clear()
        .type(goal1)
        .should('have.value', goal1)
    })

    it('Next' , () => {
        cy.get('div').find('button').contains('Next')
        .click()
    })


    it('Optional Account Selection ' , () => {
        cy.get('div').find('button').contains('All Accounts')
        .click()
    })

//     // This is the block for no account@class='css-jm466k']

    // it('Pick portfolio Account ' , () => {
    //     cy.get('div').find('button').contains('Retirement TFSA')
    //     .click()
    // })

    it('Next' , () => {
        cy.get('div').find('button').contains('Next')
        .click()
    })

    it('Enter goal ammount', () => {
        cy.get('div').find('label').contains('I want to reach $').next()   
        .click({multiple:true})
        .type(goalnumber)
        .should('have.value', goalnumber)
    })

    it('Enter Year', () => {
        cy.get('div').find('label').contains('By').next().next()
        .clear()
        .type(year)
        .should('have.value', year)
    })

    it('Confirm Goal', () => {
        cy.get('button').contains('Start Saving!').click()
        cy.get('button').contains('Refresh').click().wait(4000)

    })

    it('Return to Dashboard  Page', () => {
        cy.fixture('testDomain').as('login')
        
        cy.get('@login').then(domain => {
        cy.visit((domain.test).concat('/dashboard')) })
        cy.get('button').contains('Refresh').click().wait(4000)
    })


    it('Return to Goals Page', () => {
        cy.fixture('testDomain').as('login')
        
        cy.get('@login').then(domain => {
        cy.visit((domain.test).concat('/goals')) })
        cy.get('button').contains('Refresh').click()
    })


    it('Edit Goal', () => {
        cy.contains('Goals').click()
        cy.get('div').find('h2').contains(goal1)
        .click({multiple:true})
    })

    it('Change goal name', () => {
        cy.get('div').find('div.css-ov1ktg main.css-ozbw39 div.css-875kku div.css-2lma4n div:nth-child(3) > button.css-1v6e5e8').click() 
        cy.get('button').contains('Edit Name').click({multiple: true})
        .get('div').find('input').first()
        .clear()
        .type(goal2)

        cy.contains('Finish').click()
    })

    it('Update Goal', () => {
        cy.get('button').contains('Update Goal').click()

    })

    it('Update the target amount', () => {
        cy.get('button').contains('Edit Target').click()
        .get('div').find('input').last()
        .clear()
        .type(goalnumber2)
        .get('button').contains('Update').click()

    })

    it('Update Goal', () => {
        cy.get('button').contains('Update Goal').click()

    })

    it('Return to Dashboard  Page', () => {
        cy.fixture('testDomain').as('login')
        
        cy.get('@login').then(domain => {
        cy.visit((domain.test).concat('/dashboard')) })
        cy.get('button').contains('Refresh').click()
    })

    it('Return to Goals Page and add 2nd goal', () => {
        cy.fixture('testDomain').as('login')
        cy.get('@login').then(domain => {
        cy.visit((domain.test).concat('/goals')) })
        cy.get('button').contains('Refresh').click()
        .get('button').contains('Add Goal').click()

    })

    // This is where  the 2nd goal is added to confirm it iterates correctly if the same name is entered


    it('Create a goal name', () => {
        cy.get('[id=goalname]')
        .clear()
        .type(goal1)
        .should('have.value', goal1)
    })

    it('Optional Account Selection ' , () => {
        cy.get('div').find('button').contains('Next')
        .click()
    })

    // This is the block for no account

    it('Pick no account' , () => {
        cy.get('div').find('button').contains('Next')
        .click()
    })

    // it('Pick portfolio Account ' , () => {
    //     cy.get('div').find('button').contains('Retirement TFSA')
    //     .click()
    // })


    it('Enter goal ammount', () => {
        cy.get('div').find('label').contains('I want to reach $').next()   
        .click({multiple:true})
        .type(goalnumber)
        .should('have.value', goalnumber)
    })


    it('Enter Year', () => {
        cy.get('div').find('label').contains('By').next().next()
        .clear()
        .type(year)
        .should('have.value', year)
    })

    it('Confirm Goal', () => {
        cy.get('button').contains('Start Saving!').click()
    })

    it('Reset to Dashboard', () => {
        cy.fixture('testDomain').as('login')      
        cy.get('@login').then(domain => {
        cy.visit((domain.test).concat('/Dashboard')) })
    })

    it('View all Goals', () => {
            cy.fixture('testDomain').as('login')
        
            cy.get('@login').then(domain => {
            cy.visit((domain.test).concat('/goals')) })
    })

})

})
