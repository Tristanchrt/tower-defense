// https://on.cypress.io/api

describe('Party management', () => {
  it('Should have empty board when I create a new party', () => {
    cy.visit('/')
    cy.contains('h1', 'Party to create')
    cy.contains('button', 'Create party')
      .should('be.visible')
      .click();

    cy.contains('h1', 'Party')

    const numberOfElements = 6 * 12;
    cy.get('span.cell')
      .should('have.length', numberOfElements)
      .first()
      .should('have.text', '.')
      .and('be.visible');
  })
})
