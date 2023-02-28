import puppeteer, { ElementHandle, Page } from "puppeteer"

export default class CrawlerService {

  public async start(url: string): Promise<Page> {
    const browser = await puppeteer.launch({ headless: false})
    const page = await browser.newPage()
    await page.setViewport({width: 1080, height: 1024})
    await page.setDefaultNavigationTimeout(90000)
    await page.goto(url)
    return page
  }

  public async setInput(page: Page, element: string, value: string): Promise<void> {
    await page.type(element, value)
  }

  public async buttonClick(page: Page, element: any): Promise<void> {
    await page.click(element)
  }

  // public async getElement(page: Page, element: string,): Promise<ElementHandle<HTMLSelectElement> | null> {
  //   return page.$();
  // }

}

