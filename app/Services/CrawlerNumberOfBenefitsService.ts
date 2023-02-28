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
        await this.extract(page)
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
    const button = await this.crawler.getShadowRootElement(page, '#ion-overlay-1 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > app-modal-fila > ion-button', 'button')
    await (button as ElementHandle<Element>).click()
  }

  private async menuOptions(page: Page) {
    await page.waitForSelector('body > app-root > app-home > ion-app > ion-menu > ion-content',  {timeout: 90000})
    const button = await this.crawler.getShadowRootElement(page, 'body > app-root > app-home > ion-app > ion-menu > ion-content > ion-list > ion-item:nth-child(2)', 'div.item-native')
    await (button as ElementHandle<Element>).click()
  }

  private async extract(page: Page) {
    await page.waitForSelector('#main > ion-content > app-extrato > ion-content > form',  {timeout: 90000})
    await page.waitForSelector('#extratoonline > ion-row:nth-child(2) > ion-col > ion-card',  {timeout: 90000})
    const button = await this.crawler.getShadowRootElement(page, '#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-button:nth-child(10)', 'button > span')
    console.log(button)
    await (button as ElementHandle<Element>).click()
  }
}
