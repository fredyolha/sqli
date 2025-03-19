import { expect, test } from '@playwright/test';
import { GoogleBasePage } from "../src/pages/google-base-page";
import { WikipediaPage } from "../src/pages/wikipedia-page";


let googlePage: GoogleBasePage;
let wikipediaPage: WikipediaPage;
test.beforeEach(async ({page}) => {
    googlePage = new GoogleBasePage(page);
    await googlePage.navigateToPage();
});

test('Test wikipedia link search', async ({ page }) => {
    await googlePage.performSearch('automation');
    wikipediaPage = await googlePage.openWikipediaPage();
    await wikipediaPage.makeWikiScreenshot();
});
