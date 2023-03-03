import { inject } from "@adonisjs/core/build/standalone";
import { Error, Urls } from "App/enums/Crawler.enum";
import INumberOfBenefitsValidatorInterface from "App/interfaces/numberOfBenefitsValidatorInterface";
import { ElementHandle, Page } from "puppeteer";

import CrawlerService from "./CrawlerService";

@inject()
export default class CrawlerNumberOfBenefitsService {
  private TIME_OUT = 90000
  constructor(private crawler: CrawlerService)  {}
  async getNumberOfBenefits({cpf, login, password}: INumberOfBenefitsValidatorInterface): Promise<Array<string | null> | string> {
        const page = await this.setLink()
        await this.setLogin(page, login, password)
        await this.setNotifys(page)
        await this.setMenuOptions(page)
        await this.setExtract(page)
        await this.setCpf(page, cpf)
        const numberOfBenefit = await this.getBenefitsNumber(page)
        await page.close()
        return await this.formateData(numberOfBenefit)
  }

  private async setLink(): Promise<Page> {
    const firstLink = await this.crawler.start(Urls.EXTRATO_CLUB)
    const secondLink = await firstLink.evaluate(() =>  document.querySelector('html > frameset > frame')?.getAttribute('src'))
    firstLink.close()
    return await this.crawler.start(secondLink ? secondLink : Urls.EXTRATO_CLUB)
  }

  private async setLogin(page: Page, login: string, password: string) {
    await this.crawler.setInput(page, '#user', login)
    await this.crawler.setInput(page, '#pass', password)
    await this.crawler.buttonClick(page, '#botao')
  }

  private async setNotifys(page: Page) {
    await page.waitForSelector('#ion-overlay-1 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > app-modal-fila > ion-button', {timeout: this.TIME_OUT})
    await page.waitForTimeout(2000)
    const button = await this.crawler.getShadowRootElement(page, '#ion-overlay-1 > div.modal-wrapper.ion-overlay-wrapper.sc-ion-modal-md > app-modal-fila > ion-button', 'button')
    await (button as ElementHandle<Element>).click()
  }

  private async setMenuOptions(page: Page) {
    await page.waitForSelector('body > app-root > app-home > ion-app > ion-menu > ion-content',  {timeout: this.TIME_OUT})
    const button = await this.crawler.getShadowRootElement(page, 'body > app-root > app-home > ion-app > ion-menu > ion-content > ion-list > ion-item:nth-child(2)', 'div.item-native')
    await (button as ElementHandle<Element>).click()
  }

  private async setExtract(page: Page) {
    await page.waitForSelector('#main > ion-content > app-extrato > ion-content > form',  {timeout: this.TIME_OUT})
    await page.waitForSelector('#extratoonline > ion-row:nth-child(2) > ion-col > ion-card',  {timeout: this.TIME_OUT})
    await page.waitForSelector('#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-button:nth-child(1)',  {timeout: this.TIME_OUT})
    await page.waitForTimeout(1000)
    await page
    .$$eval('#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-button', (e) => e.map((element) =>  {
      if (element.textContent === 'Encontrar Benefícios de um CPF') {
      element.shadowRoot.querySelector('button').click()
      }
    }))

  }

  private async setCpf(page: Page, cpf: string) {
    await page.waitForSelector('#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-grid > ion-row:nth-child(2) > ion-col > ion-card > ion-item > ion-input > input', {timeout: this.TIME_OUT})
    await this.crawler.setInput(page, '#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-grid > ion-row:nth-child(2) > ion-col > ion-card > ion-item > ion-input > input', cpf)
    await page.waitForTimeout(2000)
    await page.evaluateHandle(() => document.querySelector('#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-grid > ion-row:nth-child(2) > ion-col > ion-card > ion-button')?.shadowRoot?.querySelector('button')?.click())
  }

  private async getBenefitsNumber(page: Page): Promise<Array<string | null>>{
    await page.waitForSelector('#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-grid > ion-row:nth-child(2) > ion-col > ion-card > ion-card-header > ion-card-title', {timeout: this.TIME_OUT})
    return await page
    .$$eval('#extratoonline > ion-row:nth-child(2) > ion-col > ion-card > ion-grid > ion-row:nth-child(2) > ion-col > ion-card > ion-item', (e) => e.map((element) =>  element.textContent))
  }

  private async formateData(data: Array<string | null>): Promise<Array<string | null> | string>{
    return data[0] === Error.NOT_FOUND_REGISTRATION ? Error.NOT_FOUND_REGISTRATION : data
  }
}
