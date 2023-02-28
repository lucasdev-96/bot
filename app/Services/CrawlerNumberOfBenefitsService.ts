
import { inject } from "@adonisjs/core/build/standalone";
import { Urls } from "App/enums/Crawler.enum";
import CrawlerService from "./CrawlerService";

@inject()
export default class CrawlerNumberOfBenefitsService {
  constructor(private crawler: CrawlerService)  {}
  async getNumberOfBenefits() {
        const page = await this.crawler.start('https://novoportal.cruzeirodosul.edu.br/')
        // const searchValue = await page.evaluate(() => {
        //   return {
        //     test: document.querySelector('input[name="username"]')

        //   }
        // })
        // console.log(searchValue.test)
        page.type('#txt-rgmcpf', 'oiieee')
        // await page.close()
  }
}
