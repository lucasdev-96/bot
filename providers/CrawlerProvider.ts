import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import puppeteer from 'puppeteer'

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class CrawlerProvider {
  constructor(protected app: ApplicationContract) {}

  public async run(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
  }
}
