import { inject } from "@adonisjs/core/build/standalone";
import { Urls } from "App/enums/Crawler.enum";
import INumberOfBenefitsValidatorInterface from "App/interfaces/numberOfBenefitsValidatorInterface";
import { ElementHandle, Page } from "puppeteer";

import CrawlerService from "./CrawlerService";

@inject()
export default class CrawlerNumberOfBenefitsService {
  private TIME_OUT = 9000
  constructor(private crawler: CrawlerService)  {}
  async getNumberOfBenefits({cpf, login, password}: INumberOfBenefitsValidatorInterface) {
        const page = await this.link()
        await this.login(page, login, password)
        await this.notifys(page)
        await this.menuOptions(page)
        await this.extract(page)
        // await page.close()
  }

  private async link(): Promise<Page> {
    const firstLink = await this.crawler.start(Urls.EXTRATO_CLUB)
    const secondLink = await firstLink.evaluate(() =>  document.querySelector('html > frameset > frame')?.getAttribute('src'))
    firstLink.close()
    return await this.crawler.start(secondLink ? secondLink : Urls.EXTRATO_CLUB)
  }

  private async login(page: Page, login: string, password: string) {
    await this.crawler.setInput(page, '#user', login)
    await this.crawler.setInput(page, '#pass', password)
    await this.crawler.buttonClick(page, '#botao')
  }

  private async notifys(page: Page) {
    await page.waitForSelector('#ion-overlay-1 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > app-modal-fila > ion-button', {timeout: this.TIME_OUT})
    await page.waitForTimeout(1000)
    const button = await this.crawler.getShadowRootElement(page, '#ion-overlay-1 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > app-modal-fila > ion-button', 'button')
    await (button as ElementHandle<Element>).click()
  }

  private async menuOptions(page: Page) {
    await page.waitForSelector('body > app-root > app-home > ion-app > ion-menu > ion-content',  {timeout: this.TIME_OUT})
    const button = await this.crawler.getShadowRootElement(page, 'body > app-root > app-home > ion-app > ion-menu > ion-content > ion-list > ion-item:nth-child(2)', 'div.item-native')
    await (button as ElementHandle<Element>).click()
  }

  private async extract(page: Page) {
    await page.waitForSelector('#main > ion-content > app-extrato > ion-content > form',  {timeout: this.TIME_OUT})
    await page.waitForSelector('#extratoonline > ion-row:nth-child(2) > ion-col > ion-card',  {timeout: this.TIME_OUT})
    await page.waitForTimeout(1000)
    const button = await this.crawler.getShadowRootElement(page, '#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-button:nth-child(10)', 'button > span')
    await (button as ElementHandle<Element>).click()
  }
}
