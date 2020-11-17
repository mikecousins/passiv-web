describe('Tutorial Links work', () => {

    beforeEach( () => {  
        cy.visit('localhost:8000/tutorials/')

    })

it('Article link 1 works', () => {
    cy.get('ul').children().should('have.length', 12)
    // .selectNth(1).click()
    cy.get('ul>li div a').eq(0).click({multiple:true})

})

it('Article links 2 works', () => {
    cy.get('ul>li div a').eq(2).click({multiple:true})


})

it('Article link 3 works', () => {
    cy.get('ul>li div a').eq(4).click({multiple:true})
    
})

it('Article link 4 works', () => {
    cy.get('ul>li div a').eq(6).click({multiple:true})
    
})

it('Article link 5 works', () => {
    cy.get('ul>li div a').eq(8).click({multiple:true})
    
})

it('Article link 6 works', () => {
    cy.get('ul>li div a').eq(10).click({multiple:true})
    
})

it('Article link 7 works', () => {
    cy.get('ul>li div a').eq(12).click({multiple:true})
    
})

it('Article link 8 works', () => {
    cy.get('ul>li div a').eq(14).click({multiple:true})
    
})

it('Article link 9 works', () => {
    cy.get('ul>li div a').eq(16).click({multiple:true})
    
})

it('Article link 10 works', () => {
    cy.get('ul>li div a').eq(18).click({multiple:true})
    
})

it('Article link 11 works', () => {
    cy.get('ul>li div a').eq(20).click({multiple:true})
    
})

it('Article link 12 works', () => {
    cy.get('ul>li div a').eq(22).click({multiple:true})
    
})  
 
    })





