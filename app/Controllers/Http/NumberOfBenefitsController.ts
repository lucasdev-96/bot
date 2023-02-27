import { HttpContext } from '@adonisjs/core/build/standalone'
import INumberOfBenefitsValidatorInterface from 'App/interfaces/numberOfBenefitsValidatorInterface'
import NumberOfBenefitValidator from 'App/Validators/NumberOfBenefitValidator'
import CrawlerProvider from 'providers/CrawlerProvider'

export default class NumberOfBenefitsController {
  constructor(private crawler: CrawlerProvider) {}
  public async getBenefits({ request, response }: HttpContext) {
    const payload: INumberOfBenefitsValidatorInterface = await request.validate(NumberOfBenefitValidator)
    this.crawler.run(Urls.EXTRATO_CLUB)

    response.status(200).send(payload)
  }
}
