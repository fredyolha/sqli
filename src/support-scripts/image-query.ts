import type {Page} from "@playwright/test";

export class ImageQuery {
    constructor(private page: Page) {
    }

    async returnImageIdsOnScreen() {
        return await this.page.evaluate('cyGlobals.cesdk.engine.block.findByKind(\'image\')');
    }

    async returnNumberOfImagesOnScreen(): Promise<Number> {
        const arrayField: Array<any> = await this.page.evaluate('cyGlobals.cesdk.engine.block.findByKind(\'image\')');
        return arrayField.length;
    }

}