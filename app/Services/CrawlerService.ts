import puppeteer from "puppeteer"

export default class CrawlerService {

  public async run(url: string) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    await page.close()
  }
}
