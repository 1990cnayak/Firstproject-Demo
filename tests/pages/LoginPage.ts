import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly signInName: Locator;
  readonly password: Locator;
  readonly signInButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signUpNowLink: Locator;

  constructor(private readonly page: Page) {
    this.signInName = this.page.getByRole('textbox', { name: 'Sign in name' });
    this.password = this.page.getByRole('textbox', { name: 'Password' });
    this.signInButton = this.page.getByRole('button', { name: 'Sign in' });
    this.forgotPasswordLink = this.page.getByRole('link', { name: 'Forgot your password?' });
    this.signUpNowLink = this.page.getByRole('link', { name: 'Sign up now' });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/b2clogin\.com/i);
    await expect(this.page.getByRole('heading', { name: 'Sign in', exact: true })).toBeVisible();
    await expect(this.signInName).toBeVisible();
    await expect(this.password).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.signInName.fill(username);
    await this.password.fill(password);
    await this.signInButton.click();
  }

  async submitBlank(): Promise<void> {
    await this.signInButton.click();
  }

  async expectRequiredFieldErrors(): Promise<void> {
    await expect(this.page.getByText('Please enter your Sign in name')).toBeVisible();
    await expect(this.page.getByText('Please enter your password')).toBeVisible();
  }

  async expectInvalidCredentialError(): Promise<void> {
    await expect(this.page.getByText(/password is incorrect|incorrect|invalid/i)).toBeVisible();
  }

  async expectSupportLinks(): Promise<void> {
    await expect(this.forgotPasswordLink).toBeVisible();
    await expect(this.signUpNowLink).toBeVisible();
    await expect(this.forgotPasswordLink).toHaveAttribute('href', /forgotPassword/i);
    await expect(this.signUpNowLink).toHaveAttribute('href', /unified\?local=signup/i);
  }

  async expectPasswordMasked(): Promise<void> {
    await this.password.fill('SamplePassword!123');
    await expect(this.password).toHaveAttribute('type', 'password');
  }
}
