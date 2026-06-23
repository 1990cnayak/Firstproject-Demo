# Playwright Test Structure (POM)

## Folder Layout
- tests/specs: test specifications
- tests/pages: page object classes
- tests/fixtures: shared Playwright fixtures
- tests/data: test data readers/providers

## Naming Convention
- Page objects: `*Page.ts`
- Spec files: `*.spec.ts`
- Fixture files: `*Fixtures.ts`

## Run Commands
- `npm test`
- `npm run test:headed`
- `npm run test:chromium`
- `npm run test:login`
