import { test, expect } from '../fixtures/pomFixtures';
import { readLoginCredentials } from '../data/excelCredentials';

test.describe('CROMS Login - POM Suite', () => {
  test.describe.configure({ timeout: 120000 });

  test('TC-LOGIN-001: valid login with Excel credentials', async ({ page, homePage, loginPage }) => {
    const { username, password } = readLoginCredentials(0);

    await homePage.goto();
    await homePage.expectLoaded();
    await homePage.clickSignIn();
    await loginPage.expectLoaded();

    await loginPage.login(username, password);

    await expect(page).toHaveURL(/www-test\.niacroms\.org/, { timeout: 90000 });
    await page.waitForLoadState('domcontentloaded');
    await homePage.expectAuthenticated();
  });

  test('TC-LOGIN-002: login form loads from home page', async ({ homePage, loginPage }) => {
    await homePage.goto();
    await homePage.clickSignIn();
    await loginPage.expectLoaded();
  });

  test('TC-LOGIN-003: required field validation for blank submit', async ({ homePage, loginPage }) => {
    await homePage.goto();
    await homePage.clickSignIn();
    await loginPage.expectLoaded();

    await loginPage.submitBlank();
    await loginPage.expectRequiredFieldErrors();
  });

  test('TC-LOGIN-004: invalid password shows authentication error', async ({ homePage, loginPage }) => {
    const { username } = readLoginCredentials(0);

    await homePage.goto();
    await homePage.clickSignIn();
    await loginPage.expectLoaded();

    await loginPage.login(username, 'WrongPassword123!');
    await loginPage.expectInvalidCredentialError();
  });

  test('TC-LOGIN-005: forgot password and sign up links are available', async ({ homePage, loginPage }) => {
    await homePage.goto();
    await homePage.clickSignIn();
    await loginPage.expectLoaded();

    await loginPage.expectSupportLinks();
  });

  test('TC-LOGIN-006: password field masks typed input', async ({ homePage, loginPage }) => {
    await homePage.goto();
    await homePage.clickSignIn();
    await loginPage.expectLoaded();

    await loginPage.expectPasswordMasked();
  });
});
