import { HttpContext, inject } from '@adonisjs/core/build/standalone'
import INumberOfBenefitsValidatorInterface from 'App/interfaces/numberOfBenefitsValidatorInterface'
import CrawlerService from 'App/Services/CrawlerService'
import NumberOfBenefitValidator from 'App/Validators/NumberOfBenefitValidator'
import { Urls } from 'App/enums/Crawler.enum'

@inject()
export default class NumberOfBenefitsController {
  constructor(private crawler: CrawlerService) {}
  public async getBenefits({ request, response }: HttpContext) {
    const payload: INumberOfBenefitsValidatorInterface = await request.validate(NumberOfBenefitValidator)
    this.crawler.run(Urls.EXTRATO_CLUB)


    response.status(200).send(payload)
  }
}
