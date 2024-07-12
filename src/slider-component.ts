import {type Locator, type Page} from '@playwright/test';


export class SliderComponent {
    private page: Page;
    private parentLocator: Locator;
    private sliderSelector: string;
    private toggleNumberLocator: Locator;
    private numberInputLocator: Locator;

    constructor(page: Page, sliderSelector: string) {
        this.page = page;
        this.sliderSelector = sliderSelector;
        this.parentLocator = this.page.locator(this.sliderSelector).locator("../..");
        this.toggleNumberLocator = this.parentLocator.getByRole('button');
        this.numberInputLocator = this.parentLocator.locator('input[type="number"]');
    }

    async toggleManualValueSet(): Promise<void> {
        await this.page.hover(this.sliderSelector);
        await this.toggleNumberLocator.click();
    }

    async sliderThingy(valueAsPercent: number): Promise<void> {
        const sliderBound = await this.page.locator(this.sliderSelector).boundingBox();
        const targetX = sliderBound.x + (sliderBound.width * await this.getCurrentValue() / 100);
        const targetY = sliderBound.y + sliderBound.height / 2;
        await this.page.mouse.move(targetX, targetY);
        await this.page.mouse.down();
        await this.page.mouse.move(
            sliderBound.x + (sliderBound.width * valueAsPercent) / 100,
            sliderBound.y + sliderBound.height / 2,
        );
        await this.page.mouse.up();
    }

    async setTheValueByInput(literalValue: number): Promise<void> {
        await this.toggleManualValueSet();
        await this.numberInputLocator.fill(literalValue.toString());
    }

    async getCurrentValue(): Promise<number> {
        let value = await this.numberInputLocator.inputValue();
        console.log(value);
        return Number(value);
    }
}

