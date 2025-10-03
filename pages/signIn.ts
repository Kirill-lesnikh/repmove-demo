import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base";

export class SignInPage extends BasePage {
    path: string

    constructor(page: Page) {
        super(page)
        this.path = '/auth/sign-in'
    }

    get emailInput(): Locator {
        return this.page.locator('input[type="email"]')
    }
    
    get passwordInput(): Locator {
        return this.page.locator('input[type="password"]')
    }

    get signInButton(): Locator {
        return this.page.locator('button[type="submit"]')
    }

    get signUpLink(): Locator {
        return this.page.getByRole('button', { name: 'Sign Up Now' })
    }

    get emailInputPlaceholder(): Locator {
        return this.page.locator('app-input[type="email"] div.__placeholder')
    }

    get passwordInputPlaceholder(): Locator {
        return this.page.locator('app-input[type="password"] div.__placeholder')
    }

    get emailInputErrorText(): Locator {
        return this.page.locator('app-input[type="email"] div.__error')
    }

    get passwordInputErrorText(): Locator {
        return this.page.locator('app-input[type="password"] div.__error')
    }

    get alertToast(): Locator {
        return this.page.locator('div[role="alert"]')
    }


}