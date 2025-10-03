import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base";
import { Industry } from "data/enums";

export class SignUpPage extends BasePage {
    path: string

    constructor(page: Page) {
        super(page)
        this.path = '/auth/sign-up'
    }

    get firstNameInput(): Locator {
        return this.page.locator('app-input[formcontrolname="firstName"] input')
    }
    
    get firstNameInputPlaceholder(): Locator {
        return this.page.locator('app-input[formcontrolname="firstName"] div.__placeholder')
    }

    get firstNameInputErrorText(): Locator {
        return this.page.locator('app-input[formcontrolname="firstName"] app-validation-message>div')
    }

    get lastNameInput(): Locator {
        return this.page.locator('app-input[formcontrolname="lastName"] input')
    }

    get lastNameInputPlaceholder(): Locator {
        return this.page.locator('app-input[formcontrolname="lastName"] div.__placeholder')
    }


    get lastNameInputErrorText(): Locator {
        return this.page.locator('app-input[formcontrolname="lastName"] app-validation-message>div')
    }

    get companyNameInput(): Locator {
        return this.page.locator('app-input[formcontrolname="companyName"] input')
    }

    get companyNameInputPlaceholder(): Locator {
        return this.page.locator('app-input[formcontrolname="companyName"] div.__placeholder')
    }

    get companyNameInputErrorText(): Locator {
        return this.page.locator('app-input[formcontrolname="companyName"] app-validation-message>div')
    }

    get industrySelect(): Locator {
        return this.page.locator('ng-select[formcontrolname="industry"]')
    }

    get industrySelectPlaceholder(): Locator {
        return this.page.locator('ng-select[formcontrolname="industry"] div.ng-placeholder')
    }

    get industrySelectErrorText(): Locator {
        return this.page.locator('div:has(ng-select[formcontrolname="industry"])>app-validation-message>span')
    }

    industrySelectOption(industry: Industry): Locator {
        return this.page.locator(`//span[@class="ng-option-label" and text()="${industry}"]`)
    }

    get phoneNumberInput(): Locator {
        return this.page.locator('app-phone-number[formcontrolname="phone"] app-input input')
    }

    get phoneNumberInputPlaceholder(): Locator {
        return this.page.locator('app-phone-number[formcontrolname="phone"] div.__placeholder')
    }

    get phoneNumberInputErrorText(): Locator {
        return this.page.locator('app-phone-number[formcontrolname="phone"] app-validation-message>div')
    }

    get emailInput(): Locator {
        return this.page.locator('app-input[formcontrolname="email"] input')
    }

    get emailInputPlaceholder(): Locator {
        return this.page.locator('app-input[formcontrolname="email"] div.__placeholder')
    }

    get emailInputErrorText(): Locator {
        return this.page.locator('app-input[formcontrolname="email"] app-validation-message>div')
    }

    get phoneNumberSelect(): Locator {
        return this.page.locator('app-phone-number[formcontrolname="phone"] ng-select')
    }

    phoneNumberSelectOption(phoneCode: string): Locator {
        return this.page.locator(`//div[contains(@class, "ng-option")][descendant::span[text()="${phoneCode}"]]`)
    }

    get passwordInput(): Locator {
        return this.page.locator('app-input[formcontrolname="password"] input')
    }

    get passwordInputPlaceholder(): Locator {
        return this.page.locator('app-input[formcontrolname="password"] div.__placeholder')
    }

    get passwordInputErrorText(): Locator {
        return this.page.locator('app-input[formcontrolname="password"] app-validation-message>div')
    }
    get signUpButton(): Locator {
        return this.page.locator('button[type="submit"]')
    }

    get signInLink(): Locator {
        return this.page.getByRole('button', { name: 'Sign In', exact: true})
    }

    async selectPhoneCountry(code: string) {
        await this.phoneNumberSelect.click()
        await this.phoneNumberSelectOption(code).click()
    }
}