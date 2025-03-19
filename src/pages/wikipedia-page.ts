import {type Locator, type Page} from '@playwright/test';

export class WikipediaPage {
    readonly page: Page;
    private loadPageLocator: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.loadPageLocator = page.locator('//h1[@id="firstHeading"]');
        this.loadPageLocator.waitFor({ state: 'visible' });
    }

    async makeWikiScreenshot(): Promise<void> {
        await this.page.screenshot({ path: 'wikipedia.png' });
    }
}

// MISSING THE YEAR OF THE AUTOMATION DUE TO UNABLE TO CHANGE THE LOCALE TO EN-US (would check by regex in the wiki body thou)