import {type Locator, type Page} from '@playwright/test';

import { SearchBarComponent } from '../components/searchbar-component';
import { WikipediaPage } from './wikipedia-page';
export class GoogleBasePage {
    readonly page: Page;
    private searchBarComponent: SearchBarComponent;

    constructor(page: Page) {
        this.page = page;
        this.searchBarComponent = new SearchBarComponent(this.page);
    }

    async navigateToPage() {
        await this.page.goto('https://www.google.com');
        if (await this.page.getByRole('heading', { name: 'Antes de ir a Google' }).isVisible({ timeout: 2_000 })) {
            await this.page.getByRole('button', { name: 'Aceptar todo' }).click();
        }
        await this.page.waitForSelector(this.searchBarComponent.searchBarSelector);
    }
    
    async performSearch(searchPhrase: string): Promise<void> {
        await this.searchBarComponent.performSearch(searchPhrase);
        await this.page.waitForLoadState('load');  
    }

    async getLinkByHref(href: string): Promise<Locator> {
        const linkToReturn = this.page.locator('//a[contains(@href, "wikipedia.org")][h3]').first();
        return linkToReturn;
    }

    async openWikipediaPage(): Promise<WikipediaPage> {
        const linkLocator = await this.getLinkByHref("wikipedia.org");
        await linkLocator.click();
        return new WikipediaPage(this.page);
    }
}