# Cypress E2E Tests

This directory contains end-to-end tests for the Notes Manager application using Cypress.

## Test Coverage

The test suite covers:

- ✅ Notes list display and empty state
- ✅ Creating new notes with validation
- ✅ Viewing and editing notes
- ✅ Deleting notes with confirmation
- ✅ Form validation (required fields, max length)
- ✅ Character counters
- ✅ Loading states
- ✅ Error handling
- ✅ Modal interactions (open, close, cancel)

## Prerequisites

1. **Backend API must be running** on `https://localhost:5001`
2. **Frontend dev server** should be running on `http://localhost:5173` (or update `baseUrl` in `cypress.config.ts`)

## Running Tests

### Option 1: Interactive Mode (Recommended for Development)

```bash
npm run cypress:open
```

This opens the Cypress Test Runner GUI where you can:
- See all tests
- Run tests individually
- Watch tests execute in real-time
- Debug tests easily

### Option 2: Headless Mode (CI/CD)

```bash
npm run cypress:run
```

or

```bash
npm run test:e2e
```

This runs all tests in headless mode (no GUI) and is suitable for CI/CD pipelines.

### Option 3: Run Specific Test File

```bash
npx cypress run --spec "cypress/e2e/notes.cy.ts"
```

## Test Structure

```
cypress/
├── e2e/
│   └── notes.cy.ts          # Main test suite
├── support/
│   ├── commands.ts          # Custom Cypress commands
│   └── e2e.ts              # Support file configuration
└── fixtures/                # Test data (if needed)
```

## Custom Commands

The test suite includes custom commands:

- `cy.waitForNotes()` - Waits for notes to load
- `cy.createNoteViaAPI(note)` - Creates a note via API
- `cy.deleteAllNotes()` - Deletes all notes via API

## Configuration

Test configuration is in `cypress.config.ts`:

- **Base URL**: `http://localhost:5173` (Vite default)
- **Viewport**: 1280x720
- **Timeouts**: 10 seconds for commands and requests

## Troubleshooting

### Tests fail with "Connection refused"

- Make sure the frontend dev server is running: `npm run dev`
- Make sure the backend API is running on `https://localhost:5001`

### Tests fail with API errors

- Verify the backend API is accessible
- Check CORS settings on the backend
- For HTTPS localhost, you may need to add `chromeWebSecurity: false` to `cypress.config.ts`

### Elements not found

- Make sure the app is fully loaded before tests run
- Check that test data attributes are present in components
- Increase timeout if needed: `cy.get('.element', { timeout: 15000 })`

## Best Practices

1. **Run tests in interactive mode first** to ensure they work
2. **Keep backend running** during test development
3. **Clean up test data** - tests use `deleteAllNotes()` in beforeEach
4. **Use data-testid attributes** for reliable element selection
5. **Wait for async operations** - use `cy.waitForNotes()` custom command

## CI/CD Integration

For CI/CD pipelines, use:

```bash
npm run cypress:run
```

Make sure to:
- Start the frontend server before running tests
- Have the backend API available
- Set appropriate environment variables if needed

