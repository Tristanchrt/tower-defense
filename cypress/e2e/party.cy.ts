// https://on.cypress.io/api

describe('Party management', () => {

  const createParty = () => cy.contains('button', 'Create party')
    .should('be.visible')
    .click();

  const startParty = () => {
    cy.get('div.party').first().click()
    cy.on('window:alert',(t)=> {
      expect(t).to.contains('Do you want to start the party?');
      cy.get(':nth-child(2) > button').click()
    })
    cy.get('span.party-id').then(function($elem) {
      cy.get('div.party').first().click()
    })
  }

  it('Should create a party and verify it appears in the list with correct details', () => {
    cy.visit('/parties')

    cy.contains('h1', 'List of parties')
    cy.contains('h1', 'Party to create')
    cy.contains('span', 'Empty list')
    createParty()

    cy.get('span.party-id').should('have.length', 1);
    cy.get('span.party-status').should('contain.text', 'CREATED');
    cy.get('span.party-id').invoke('text').then((text) => {
      const value = parseInt(text, 10);
      expect(value).to.be.within(10, 100000);
    });

    createParty()

    cy.get('span.party-id').should('have.length', 2);
  })
  it('Should start a party and display an empty board with the list of players', () => {
    cy.visit('/parties')
    createParty()
    cy.get('div.party').first().click()
    cy.on('window:alert',(t)=> {
      expect(t).to.contains('Do you want to start the party?');
      cy.get(':nth-child(2) > button').click()
    })
    cy.get('span.party-status').should('contain.text', 'PLAYERS_TO_PLAY');

    cy.get('span.party-id').then(function($elem) {
      cy.get('div.party').first().click()
      cy.url().should('include','/parties/'+$elem.text())
      cy.contains('h1', 'Party #'+$elem.text())
      cy.contains('h3', 'Round #1')

      cy.get('div.player .player-name').first().should('have.text', 'Player 1')
      cy.get('div.player .player-name').last().should('have.text', 'Player 2')
      cy.get('div.player .player-turn').first().should('have.text', 'Y')
      cy.get('div.player .player-turn').last().should('have.text', 'N')

      const numberOfElements = 6 * 12;
      cy.get('span.cell')
        .should('have.length', numberOfElements)
        .first()
        .should('have.text', '.')
        .and('be.visible');
    })


  })

  it('Should add tower to the board when player 1 is playing', () => {
    cy.visit('/parties')
    createParty()
    startParty()

    cy.get('button').click()
    cy.get('span.cell').first().should('have.text', 'T').and('be.visible');

    cy.get('div.player .player-turn').first().should('have.text', 'N')
    cy.get('div.player .player-turn').last().should('have.text', 'Y')
  })
})
