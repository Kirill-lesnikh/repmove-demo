import { Expect, Page } from "@playwright/test";
import { expect } from '@playwright/test';
import { Config } from "config/config";
import { URL } from "url";


export class BasePage {
    page: Page
    path: string
    expect: Expect

    constructor(page: Page) {
        this.page = page
        this.path = '/'
        this.expect = expect
    }

    get pageUrl(): URL {
        return new URL(new URL(this.path, Config.host))
    }

    async verifyPagePath() {
        await this.page.waitForURL(this.pageUrl.href)
    }

    async navigate() {
        return await this.page.goto(this.pageUrl.href)
    }


}