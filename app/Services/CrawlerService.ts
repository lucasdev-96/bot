import puppeteer, { Page } from "puppeteer"

export default class CrawlerService {

  public async start(url: string): Promise<Page> {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox']})
    const page = await browser.newPage()
    await page.setViewport({width: 1080, height: 1024});
    await page.goto(url)
    return page
  }
}
