import { test } from '../fixtures/pomFixtures';

test('home page loads and title is visible', async ({ homePage }) => {
  await homePage.goto();
  await homePage.expectLoaded();
});
