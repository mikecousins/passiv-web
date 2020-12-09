// Testing goal setting ability on desktop browser
// need to enter account credentials to gain access

describe('Desktop goal setting test', () => {
    

            //these are placeholder values
            const  user = "testemail12345@passiv.com"
            const  pass = "test12345"
            
            //these are the values for the goal
            const goal1 = "Get the bag"
            const goalnumber = "1000000"
            const month = "07"
            const year = "2050"

            const goal2 = "Get the bread"
            const goalnumber2 = "10000000"




    
    it('Login Success', () => {
        cy.visit('localhost:3000/app/dashboard')    
        
        cy.get('[name=email]')
            .type(user)
            .should('have.value', user)
        cy.get('[placeholder=Password]')
            .type(pass)
            .should('have.value', pass)    

        cy.get('form').submit()
    })

            it('Collapse button works', () => {
                cy.contains('Collapse').click({multiple:true})
            })

            it('Expand button works', () => {
                cy.contains('Expand').click()
            })
                
            it('Goals button works', () => {
                cy.contains('Goals').click()
                .should('have.attr', 'href', '/app/goals')

            })

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

            // it('Pick no account' , () => {
            //     cy.get('div').find('button').contains('Next')
            //     .click()
            // })

            it('Pick portfolio Account ' , () => {
                cy.get('div').find('button').contains('Retirement TFSA')
                .click()
            })

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

            it('Enter Month', () => {
                cy.get('div').find('label').contains('By').next()
                .select(month)
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

            it('Return to Goals Page', () => {
                cy.get('aside').find('a').contains('Goals').click()
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



            it('Return to Goals Page and add 2nd goal', () => {
                cy.get('aside').find('a').contains('Goals').click()
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

            it('Enter Month', () => {
                cy.get('div').find('label').contains('By').next()
                .select(month)
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
                cy.visit('localhost:3000/app/dashboard')
            })

            it('View all Goals', () => {
                    cy.get('aside').find('a').contains('Goals').click()
            })

    
    it('Delete the goal2', () => {
        cy.get('div').find('h2').contains(goal2).click() 
        cy.get('div').find('div.css-ov1ktg main.css-ozbw39 div.css-875kku div.css-2lma4n div:nth-child(3) > button.css-1v6e5e8').click()
        cy.contains('Delete').click({multiple: true})
        cy.get('button').contains('Delete').click()

    })
    
    it('Delete the first goal', () => {
    cy.get('div').find('h2').contains(goal1).click() 
    cy.get('div').find('div.css-ov1ktg main.css-ozbw39 div.css-875kku div.css-2lma4n div:nth-child(3) > button.css-1v6e5e8').click()
    cy.contains('Delete').click({multiple: true})
    cy.get('button').contains('Delete').click({multiple: true})
    })
        
                // .get('div').find('input').first()
                // .clear()
                // .type(goal2)  
            
    
    it('Logout', () => {
        cy.get('button').contains('Logout').click()
    
    })

    })

