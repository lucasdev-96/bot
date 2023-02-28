import { HttpContext, inject } from '@adonisjs/core/build/standalone'
import INumberOfBenefitsValidatorInterface from 'App/interfaces/numberOfBenefitsValidatorInterface'
import CrawlerNumberOfBenefitsService from 'App/Services/CrawlerNumberOfBenefitsService'
import NumberOfBenefitValidator from 'App/Validators/NumberOfBenefitValidator'

@inject()
export default class NumberOfBenefitsController {
  constructor(private crawlerNumberOfBenefits: CrawlerNumberOfBenefitsService)  {}
  public async getBenefits({ request, response }: HttpContext) {
    const payload: INumberOfBenefitsValidatorInterface = await request.validate(NumberOfBenefitValidator)
    const numberOfBenfits = await this.crawlerNumberOfBenefits.getNumberOfBenefits(payload)

    response.status(200).send(payload)
  }
}
