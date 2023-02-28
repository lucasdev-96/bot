import { inject } from "@adonisjs/core/build/standalone";
import { Urls } from "App/enums/Crawler.enum";
import INumberOfBenefitsValidatorInterface from "App/interfaces/numberOfBenefitsValidatorInterface";
import { ElementHandle, Page } from "puppeteer";

import CrawlerService from "./CrawlerService";

@inject()
export default class CrawlerNumberOfBenefitsService {
  constructor(private crawler: CrawlerService)  {}
  async getNumberOfBenefits({cpf, login, password}: INumberOfBenefitsValidatorInterface) {
        const page = await this.crawler.start(Urls.EXTRATO_CLUB)
        await this.login(page, login, password)
        await this.notifys(page)
        await this.menuOptions(page)
        // await page.close()
  }

  private async login(page: Page, login: string, password: string) {
    await this.crawler.setInput(page, '#user', login)
    await this.crawler.setInput(page, '#pass', password)
    await this.crawler.buttonClick(page, '#botao')
  }

  private async notifys(page: Page) {
    await page.waitForSelector('#ion-overlay-1 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > app-modal-fila > ion-button', {timeout: 90000})
    await page.waitForTimeout(1000)
    const button = await page.evaluateHandle('document.querySelector("#ion-overlay-1 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > app-modal-fila > ion-button").shadowRoot.querySelector("button")')
    await (await button as ElementHandle<Element>).click()
  }

  private async menuOptions(page: Page) {
    await page.waitForSelector('body > app-root > app-home > ion-app > ion-menu > ion-content',  {timeout: 90000})
    const button = this.crawler.getShadowRootElement(page, "body > app-root > app-home > ion-app > ion-menu > ion-content > ion-list > ion-item:nth-child(2)", "div.item-native")
    await (await button as ElementHandle<Element>).click()
  }
}
