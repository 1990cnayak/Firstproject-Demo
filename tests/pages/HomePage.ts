import { expect, type Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async clickSignIn(): Promise<void> {
    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/NIA CROMS/i);
  }

  async expectAuthenticated(): Promise<void> {
    await expect(this.page.getByRole('button', { name: 'User Settings' })).toBeVisible({
      timeout: 90000,
    });
  }
}
