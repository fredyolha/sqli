import {type Locator, type Page} from '@playwright/test';


export class SearchBarComponent {
    private page: Page;
    
    private searchBarLocator: Locator;
    public searchBarSelector: string = 'textarea[name="q"]';
    constructor(page: Page) {
        this.page = page;
        this.searchBarLocator = this.page.locator(this.searchBarSelector);
    }

    async sendKeysToSearchBar(searchPhrase: string): Promise<void> {
        await this.searchBarLocator.fill(searchPhrase);
        
    }

    async performSearch(searchPhrase: string): Promise<void> {
        await this.sendKeysToSearchBar(searchPhrase);
        await this.searchBarLocator.press("Enter");
        
    }
}

