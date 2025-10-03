import { test as base } from '@playwright/test';
import { SignInPage } from 'pages/signIn';
import { SignUpPage } from 'pages/signUp';
import { DashboardPage } from 'pages/dashboard';
type PagesFixture = {
  SignInPage: SignInPage;
  SignUpPage: SignUpPage;
  DashboardPage: DashboardPage;
};

export const pages = base.extend<PagesFixture>({
    SignInPage: async ({ page }, use) => { await use(new SignInPage(page)) },
    SignUpPage: async ({ page }, use) => { await use(new SignUpPage(page)) },
    DashboardPage: async ({ page }, use) => { await use(new DashboardPage(page)) },
});
