/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {

      waitForNotes(): Chainable<void>;

      createNoteViaAPI(note: { title: string; content: string }): Chainable<any>;

      deleteAllNotes(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('waitForNotes', () => {
  cy.get('[data-testid="loading"]', { timeout: 10000 }).should('not.exist');
  cy.get('.home-page', { timeout: 10000 }).should('be.visible');
});

Cypress.Commands.add('createNoteViaAPI', (note: { title: string; content: string }) => {
  return cy.request({
    method: 'POST',
    url: 'https://localhost:5001/api/Notes',
    body: note,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('deleteAllNotes', () => {
  cy.request({
    method: 'GET',
    url: 'https://localhost:5001/api/Notes',
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200 && Array.isArray(response.body)) {
      response.body.forEach((note: any) => {
        cy.request({
          method: 'DELETE',
          url: `https://localhost:5001/api/Notes/${note.id}`,
          failOnStatusCode: false,
        });
      });
    }
  });
});

export {};

