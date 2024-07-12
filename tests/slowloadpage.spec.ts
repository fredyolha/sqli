import {expect, test} from '@playwright/test';
import {SlowLoadingPage} from "../src/pages/slow-loading-page";
import {locatorsThatIuse} from "../src/enums/inspector-adjustments-enum";

let slowLoadingPage: SlowLoadingPage;
test.beforeEach(async ({page}) => {
    slowLoadingPage = new SlowLoadingPage(page);
    await slowLoadingPage.navigateToPage();
});

test('Test the image addition', async ({page}) => {
    let imagesSideSection = await slowLoadingPage.sideBar.openImagesSection();
    await imagesSideSection.selectFirstImage();
    imagesSideSection = await slowLoadingPage.sideBar.openImagesSection();
    await imagesSideSection.selectNthImage(3);
    await slowLoadingPage.inspectorBar.openAdjustments();
    const brightnessSlider = await slowLoadingPage.inspectorBar.getSliderFromBar(locatorsThatIuse.BRIGHTNESS);
    await brightnessSlider.setTheValueByInput(29);
    await brightnessSlider.getCurrentValue();

    const contrastSlider = await slowLoadingPage.inspectorBar.getSliderFromBar(locatorsThatIuse.CONTRAST);
    await contrastSlider.setTheValueByInput(49);
    await contrastSlider.getCurrentValue();
    await contrastSlider.setValueBySlideInPercent(100);
});

test('Test image brightness is 0', async ({page}) => {
    let imagesSideSection = await slowLoadingPage.sideBar.openImagesSection();
    await imagesSideSection.selectFirstImage();
    await slowLoadingPage.inspectorBar.openAdjustments();
    const brightnessSlider = await slowLoadingPage.inspectorBar.getSliderFromBar(locatorsThatIuse.BRIGHTNESS);
    await brightnessSlider.setTheValueByInput(0);
    const currentBrightness = await brightnessSlider.getCurrentValue();
    expect(currentBrightness).toEqual(0);
});