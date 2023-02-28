import puppeteer, { ElementHandle, Page } from "puppeteer"

export default class CrawlerService {

  public async start(url: string): Promise<Page> {
    const browser = await puppeteer.launch({ headless: false})
    const page = await browser.newPage()
    await page.setViewport({width: 1200, height: 800})
    await page.goto(url, {
      waitUntil: ['networkidle0', 'load'],
    })
    return page
  }

  public async setInput(page: Page, element: string, value: string): Promise<void> {
    await page.type(element, value)
  }

  public async buttonClick(page: Page, element: any): Promise<void> {
    await page.click(element)
  }

  public async getShadowRootElement(page: Page, querySelector: string, shadowRootElement: string): Promise<ElementHandle<Node> | null> {
    return  (await (page.evaluateHandle(`document.querySelector("${querySelector}").shadowRoot.querySelector("${shadowRootElement}")`))).asElement()
  }
}

