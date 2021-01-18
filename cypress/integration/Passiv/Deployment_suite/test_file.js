describe('Desktop goal setting test', () => {

    it('Login test 2', () => {
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

        it('Goals Test', () => {
            cy.contains('Goals').click()
            .should('have.attr', 'href', '/app/goals')


    })

})

})


//     //these are the values for the goal
//     const goal1 = "Get the bag"
//     const goalnumber = "1000000"
//     const month = "July"
//     const year = "2050"

//     const goal2 = "Get the bread"
//     const goalnumber2 = "10000000"



//     it('Create a goal name', () => {
//         cy.get('[id=goalname]')
//         .clear()
//         .type(goal1)
//         .should('have.value', goal1)
//     })

//     it('Next' , () => {
//         cy.get('div').find('button').contains('Next')
//         .click()
//     })


//     it('Optional Account Selection ' , () => {
//         cy.get('div').find('button').contains('All Accounts')
//         .click()
//     })

// //     // This is the block for no account@class='css-jm466k']

//     // it('Pick portfolio Account ' , () => {
//     //     cy.get('div').find('button').contains('Retirement TFSA')
//     //     .click()
//     // })

//     it('Next' , () => {
//         cy.get('div').find('button').contains('Next')
//         .click()
//     })

//     it('Enter goal ammount', () => {
//         cy.get('div').find('label').contains('I want to reach $').next()   
//         .click({multiple:true})
//         .type(goalnumber)
//         .should('have.value', goalnumber)
//     })

//     it('Enter Year', () => {
//         cy.get('div').find('label').contains('By').next().next()
//         .clear()
//         .type(year)
//         .should('have.value', year)
//     })

//     it('Confirm Goal', () => {
//         cy.get('button').contains('Start Saving!').click()
//         cy.get('button').contains('Refresh').click().wait(4000)

//     })

//     it('Return to Dashboard  Page', () => {
//         cy.fixture('testDomain').as('login')
        
//         cy.get('@login').then(domain => {
//         cy.visit((domain.test).concat('/dashboard')) })
//         cy.get('button').contains('Refresh').click().wait(4000)
//     })


//     it('Return to Goals Page', () => {
//         cy.fixture('testDomain').as('login')
        
//         cy.get('@login').then(domain => {
//         cy.visit((domain.test).concat('/goals')) })
//         cy.get('button').contains('Refresh').click()
//     })


//     it('Edit Goal', () => {
//         cy.contains('Goals').click()
//         cy.get('div').find('h2').contains(goal1)
//         .click({multiple:true})
//     })

//     it('Change goal name', () => {
//         cy.get('div').find('div.css-ov1ktg main.css-ozbw39 div.css-875kku div.css-2lma4n div:nth-child(3) > button.css-1v6e5e8').click() 
//         cy.get('button').contains('Edit Name').click({multiple: true})
//         .get('div').find('input').first()
//         .clear()
//         .type(goal2)

//         cy.contains('Finish').click()
//     })

//     it('Update Goal', () => {
//         cy.get('button').contains('Update Goal').click()

//     })

//     it('Update the target amount', () => {
//         cy.get('button').contains('Edit Target').click()
//         .get('div').find('input').last()
//         .clear()
//         .type(goalnumber2)
//         .get('button').contains('Update').click()

//     })

//     it('Update Goal', () => {
//         cy.get('button').contains('Update Goal').click()

//     })

//     it('Return to Dashboard  Page', () => {
//         cy.fixture('testDomain').as('login')
        
//         cy.get('@login').then(domain => {
//         cy.visit((domain.test).concat('/dashboard')) })
//         cy.get('button').contains('Refresh').click()
//     })

//     it('Return to Goals Page and add 2nd goal', () => {
//         cy.fixture('testDomain').as('login')
//         cy.get('@login').then(domain => {
//         cy.visit((domain.test).concat('/goals')) })
//         cy.get('button').contains('Refresh').click()
//         .get('button').contains('Add Goal').click()

//     })

//     // This is where  the 2nd goal is added to confirm it iterates correctly if the same name is entered


//     it('Create a goal name', () => {
//         cy.get('[id=goalname]')
//         .clear()
//         .type(goal1)
//         .should('have.value', goal1)
//     })

//     it('Optional Account Selection ' , () => {
//         cy.get('div').find('button').contains('Next')
//         .click()
//     })

//     // This is the block for no account

//     it('Pick no account' , () => {
//         cy.get('div').find('button').contains('Next')
//         .click()
//     })

//     // it('Pick portfolio Account ' , () => {
//     //     cy.get('div').find('button').contains('Retirement TFSA')
//     //     .click()
//     // })


//     it('Enter goal ammount', () => {
//         cy.get('div').find('label').contains('I want to reach $').next()   
//         .click({multiple:true})
//         .type(goalnumber)
//         .should('have.value', goalnumber)
//     })


//     it('Enter Year', () => {
//         cy.get('div').find('label').contains('By').next().next()
//         .clear()
//         .type(year)
//         .should('have.value', year)
//     })

//     it('Confirm Goal', () => {
//         cy.get('button').contains('Start Saving!').click()
//     })

//     it('Reset to Dashboard', () => {
//         cy.fixture('testDomain').as('login')      
//         cy.get('@login').then(domain => {
//         cy.visit((domain.test).concat('/Dashboard')) })
//     })

//     it('View all Goals', () => {
//             cy.fixture('testDomain').as('login')
        
//             cy.get('@login').then(domain => {
//             cy.visit((domain.test).concat('/goals')) })
//     })

// describe('Delete goals', () => {
//     it('Delete the goal2', () => {
//         cy.fixture('testDomain').as('login')
//         cy.get('@login').then(domain => {
//         cy.visit((domain.test).concat('/goals')) })
//         cy.get('div').find('h2').contains(goal2).click() 
//         cy.get('div').find('div.css-ov1ktg main.css-ozbw39 div.css-875kku div.css-2lma4n div:nth-child(3) > button.css-1v6e5e8').click()
//         cy.contains('Delete').click({multiple: true})
//         cy.get('button').find('button.css-jm466k').should('be.visible').wait(8000).contains('Delete').click()
//         cy.get('button').contains('Refresh').click()


//     })

//     it('Reset to Dashboard', () => {
//         cy.fixture('testDomain').as('login')      
//         cy.get('@login').then(domain => {
//         cy.visit((domain.test).concat('/Dashboard')) })
//         cy.get('button').contains('Refresh').click()
//     })

//     it('Delete the first goal', () => {
//         cy.fixture('testDomain').as('login')

//         cy.get('@login').then(domain => {
//         cy.visit((domain.test).concat('/goals')) })
//         cy.get('div').find('h2').contains(goal1).click() 
//         cy.get('div').find('div.css-ov1ktg main.css-ozbw39 div.css-875kku div.css-2lma4n div:nth-child(3) > button.css-1v6e5e8').click()
//         cy.contains('Delete').click({multiple: true})
//         cy.get('.aria-modal').should('be.visible')
//         .wait(8000).contains('Delete').click()
//         cy.get('button').contains('Refresh').click()

//     })


//             // .get('div').find('input').first()
//             // .clear()
//             // .type(goal2)  
        

//     it('Logout', () => {
//     cy.get('button').contains('Logout').click()

//     })
//     })
// })

//     }
