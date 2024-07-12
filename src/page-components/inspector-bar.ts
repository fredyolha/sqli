import {type Locator, type Page} from '@playwright/test';
import {SliderComponent} from "../slider-component";
import {locatorsThatIuse} from "../enums/inspector-adjustments-enum";

export class InspectorBar {
    constructor(private page: Page) {
    }

    public inspectorBar: Locator = this.page.locator('div[class*="UBQ_InspectorBar-module__area"]');
    public imageButton: Locator = this.inspectorBar.getByRole('button', {name: 'Image', exact: true});
    public inspectorButton: Locator = this.inspectorBar.getByRole('button', {name: 'inspectorbar-crop'});
    public strokeButton: Locator = this.inspectorBar.getByRole('button', {name: 'Stroke'});
    public adjustmentsButton: Locator = this.inspectorBar.getByRole('button', {name: 'Adjustments'});
    public filterButton: Locator = this.inspectorBar.getByRole('button', {name: 'Filter'});
    public effectButton: Locator = this.inspectorBar.getByRole('button', {name: 'Effect'});
    public shadowButton: Locator = this.inspectorBar.getByRole('button', {name: 'Shadow'});

    async openAdjustments(): Promise<void> {
        await this.adjustmentsButton.click()
    }

    async getSliderFromBar(enumSelection: string): Promise<SliderComponent> {
        return new SliderComponent(this.page, enumSelection);
    }
}