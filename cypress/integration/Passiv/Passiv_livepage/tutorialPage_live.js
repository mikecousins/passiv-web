describe('Tutorial Links work', () => {

    beforeEach( () => {  
        cy.visit('https://passiv.com/tutorials/')

    })

it('Article links all work', () => {
    cy.get('ul').children().should('have.length', 12)
    // .selectNth(1).click()
    cy.get('ul>li div a').eq(0).click({multiple:true})

})

it('Article links all work', () => {
    cy.get('ul>li div a').eq(1).click({multiple:true})

    // cy.get('ul>li div a').eq(0).click({multiple:true})
    // cy.get('ul>li div a').eq(0).click({multiple:true})
    // cy.get('ul>li div a').eq(0).click({multiple:true})
    // cy.get('ul>li div a').eq(0).click({multiple:true})
    // cy.get('ul>li div a').eq(0).click({multiple:true})
    // cy.get('ul>li div a').eq(0).click({multiple:true})
    // cy.get('ul>li div a').eq(0).click({multiple:true})
    // cy.get('ul>li div a').eq(0).click({multiple:true})
    // cy.get('ul>li div a').eq(0).click({multiple:true})
  
 
    })

})


