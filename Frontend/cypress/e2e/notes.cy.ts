describe('Notes Manager E2E Tests', () => {
  const note1Title = `Test Note 1 ${Date.now()}`;
  const note1Content = 'This is the first test note.';
  const note2Title = `Test Note 2 ${Date.now()}`;
  const note2Content = 'This is the second test note.';
  const updatedTitle = `Updated Note ${Date.now()}`;
  const updatedContent = 'This note has been updated.';

  beforeEach(() => {
    cy.visit('/');
    cy.waitForNotes();
  });

  it('should create two notes, edit one, verify edit, and delete both', () => {
    // Step 1: Create first note
    cy.get('.create-note-button').click();
    cy.get('#note-create-title').type(note1Title);
    cy.get('#note-create-content').type(note1Content);
    cy.get('button[type="submit"]').contains('Create Note').click();
    cy.get('.note-form-modal').should('not.exist');
    cy.waitForNotes();

    // Verify first note appears
    cy.get('.note-card').should('contain', note1Title);

    // Step 2: Create second note
    cy.get('.create-note-button').click();
    cy.get('#note-create-title').type(note2Title);
    cy.get('#note-create-content').type(note2Content);
    cy.get('button[type="submit"]').contains('Create Note').click();
    cy.get('.note-form-modal').should('not.exist');
    cy.waitForNotes();

    // Verify both notes appear
    cy.get('.note-card').should('contain', note1Title);
    cy.get('.note-card').should('contain', note2Title);

    // Step 3: Edit the first note
    cy.get('.note-card').contains(note1Title).parent().click();
    cy.get('#note-edit-title').should('have.value', note1Title);
    cy.get('#note-edit-content').should('have.value', note1Content);
    
    cy.get('#note-edit-title').clear().type(updatedTitle);
    cy.get('#note-edit-content').clear().type(updatedContent);
    cy.get('button[type="submit"]').contains('Save Changes').click();
    cy.get('.note-form-modal').should('not.exist');
    cy.waitForNotes();

    // Step 4: Verify the note was updated correctly
    cy.get('.note-card').should('contain', updatedTitle);
    cy.get('.note-card').should('contain', updatedContent.substring(0, 50));
    cy.get('.note-card').should('not.contain', note1Title);

    // Step 5: Delete the first note (updated one)
    cy.get('.note-card').contains(updatedTitle).parent().find('.note-card-delete').click({ force: true });
    cy.get('button').contains('Delete').click();
    cy.get('.confirm-modal').should('not.exist');
    cy.waitForNotes();

    cy.get('.note-card').should('not.contain', updatedTitle);
    cy.get('.note-card').should('contain', note2Title);

    // Step 6: Delete the second note
    cy.get('.note-card').contains(note2Title).parent().find('.note-card-delete').click({ force: true });
    cy.get('button').contains('Delete').click();
    cy.get('.confirm-modal').should('not.exist');
    cy.waitForNotes();

    // Verify second note is deleted
    cy.get('.note-card').should('not.contain', note2Title);
  });
});
