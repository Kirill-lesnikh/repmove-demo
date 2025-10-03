import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base";

export class DashboardPage extends BasePage {
    path: string

    constructor(page: Page) {
        super(page)
        this.path = '/dashboard'
    }
}