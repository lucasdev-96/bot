import { HttpContext, inject } from '@adonisjs/core/build/standalone'
import INumberOfBenefitsValidatorInterface from 'App/interfaces/numberOfBenefitsValidatorInterface'
import CrawlerNumberOfBenefitsService from 'App/Services/CrawlerNumberOfBenefitsService'
import VerifyLoginService from 'App/Services/VerifyLoginService'
import NumberOfBenefitValidator from 'App/Validators/NumberOfBenefitValidator'

@inject()
export default class NumberOfBenefitsController {
  constructor(private crawlerNumberOfBenefits: CrawlerNumberOfBenefitsService, private verifylogin: VerifyLoginService)  {}
  public async getBenefits({ request, response }: HttpContext) {
    const payload: INumberOfBenefitsValidatorInterface = await request.validate(NumberOfBenefitValidator)
    const isErrorLogin = this.verifylogin.errorLogin(payload.login, payload.password)
    if (isErrorLogin) {
      response.status(404).json({response: isErrorLogin})
      return;
    }
    const numberOfBenefits = await this.crawlerNumberOfBenefits.getNumberOfBenefits(payload)
    response.status(200).json({response: numberOfBenefits})
  }
}
