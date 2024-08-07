// https://on.cypress.io/api

describe('Party management', () => {
  it('Should create a party and see it in the list when create one', () => {
    cy.visit('/parties')

    cy.contains('h1', 'List of parties')
    cy.contains('h1', 'Party to create')
    cy.contains('span', 'Empty list')
    cy.contains('button', 'Create party')
      .should('be.visible')
      .click();

    cy.get('span.party').should('have.length', 1);
    cy.get('span.party').invoke('text').then((text) => {
      const value = parseInt(text, 10);
      expect(value).to.be.within(10, 100000);
    });

    cy.contains('button', 'Create party')
      .should('be.visible')
      .click();

    cy.get('span.party').should('have.length', 2);
    // const numberOfElements = 6 * 12;
    // cy.get('span.cell')
    //   .should('have.length', numberOfElements)
    //   .first()
    //   .should('have.text', '.')
    //   .and('be.visible');
  })
})
