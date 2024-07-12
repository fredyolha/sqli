import { expect, type Locator, type Page } from '@playwright/test';
import {SideBar} from "../page-components/side-bar";
import {InspectorBar} from "../page-components/inspector-bar";
export class SlowLoadingPage {
  readonly page: Page;
  readonly loadingSVGElement: Locator;
  public sideBar: SideBar;
  public inspectorBar: InspectorBar;
  constructor(page: Page) {
    this.page = page;
    this.loadingSVGElement = page.getByRole('progressbar')
    this.sideBar = new SideBar(this.page);
    this.inspectorBar = new InspectorBar(this.page);
  }

  async navigateToPage() {
    await this.page.goto('https://ubique.img.ly/develop/apps/cesdk_web/web/smoketests/slow-assets.html');
    await this.loadingSVGElement.waitFor({ state: 'hidden', timeout: 10000 })
  }
}