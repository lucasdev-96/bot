// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContext } from '@adonisjs/core/build/standalone'
import INumberOfBenefitsValidatorInterface from 'App/interfaces/numberOfBenefitsValidatorInterface'
import NumberOfBenefitValidator from 'App/Validators/NumberOfBenefitValidator'

export default class NumberOfBenefitsController {
  public async getBenefits({ request, response }: HttpContext) {
    const payload: INumberOfBenefitsValidatorInterface = await request.validate(NumberOfBenefitValidator)
    response.status(200).send(payload)
  }
}
