import { inject } from "@adonisjs/core/build/standalone";
import { Urls } from "App/enums/Crawler.enum";
import INumberOfBenefitsValidatorInterface from "App/interfaces/numberOfBenefitsValidatorInterface";

import CrawlerService from "./CrawlerService";

@inject()
export default class CrawlerNumberOfBenefitsService {
  constructor(private crawler: CrawlerService)  {}
  async getNumberOfBenefits({cpf, login, password}: INumberOfBenefitsValidatorInterface) {
        const page = await this.crawler.start(Urls.EXTRATO_CLUB)
        await this.crawler.setInput(page, '#user', login)
        await this.crawler.setInput(page, '#pass', password)
        await this.crawler.buttonClick(page, '#botao')
        await page.waitForSelector('[title="Fechar"]')
        // await page.waitForNavigation();
        await this.crawler.buttonClick(page, '[title="Fechar"]')
        // await page.close()
  }
}
