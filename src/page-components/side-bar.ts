import {type Locator, type Page} from '@playwright/test';
import {ImagesSideBar} from "./images-side-bar";

export class SideBar {
    constructor(private page: Page) {
    }

    public templatesButton: Locator = this.page.getByRole('button', {name: 'Templates'})
    public elementsButton: Locator = this.page.getByRole('button', {name: 'Elements'})
    public uploadsButton: Locator = this.page.getByRole('button', {name: 'Uploads'})
    public imagesButton: Locator = this.page.getByRole('button', {name: 'Images'})
    public textButton: Locator = this.page.getByRole('button', {name: 'Text'})
    public shapesButton: Locator = this.page.getByRole('button', {name: 'Shapes'})
    public stickersButton: Locator = this.page.getByRole('button', {name: 'Stickers'})


    async openImagesSection(): Promise<ImagesSideBar> {
        await this.imagesButton.click();
        return new ImagesSideBar(this.page);
    }
}