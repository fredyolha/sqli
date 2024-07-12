import {expect, type Locator, type Page} from '@playwright/test';
import {ImageQuery} from "../support-scripts/image-query";

export class ImagesSideBar {
    readonly page: Page;
    readonly imageSideBarArea: Locator;
    public allImageButtons: Locator;
    private imagesNumber: Number;

    constructor(page: Page) {
        this.page = page;
        this.imageSideBarArea = this.page.locator("#ubq-portal-container_panelLeft")
        this.allImageButtons = this.imageSideBarArea.locator(`button[name^="assetLibraryCard-ly.img"]`);
        this.imagesNumber = 0;
    }


    async selectFirstImage(): Promise<void> {
        await this.allImageButtons.first().waitFor({state: 'visible', timeout: 5000});
        await this.allImageButtons.first().click();
        await this.validateNewPictureAppeared(7);
    }

    async selectNthImage(imageNumber: number): Promise<void> {
        await this.allImageButtons.nth(imageNumber).waitFor({state: 'visible', timeout: 5000});
        await this.allImageButtons.nth(imageNumber).click();
        await this.validateNewPictureAppeared(7);
    }


    private async validateNewPictureAppeared(maxRetries: number): Promise<void> {
        let imageQuery: ImageQuery = new ImageQuery(this.page);
        let retryNumber: number = 0;
        while (retryNumber < maxRetries) {
            let currentNumberOfImages: Number = await imageQuery.returnNumberOfImagesOnScreen();
            if (currentNumberOfImages > this.imagesNumber) {
                this.imagesNumber = currentNumberOfImages;
                console.log('Current number of images:', currentNumberOfImages);
                break;
            }
            retryNumber++;
            await this.page.waitForTimeout(1000)
        }
        expect(retryNumber).not.toEqual(maxRetries);
    }
}