import {
  ValidatorsInterface,
  ValidationComposite,
  RequireParamValidation,
  EmailValidation,
} from '@/infra/validators'

export class LoginUserValidatorFactory {
  private static instance: LoginUserValidatorFactory

  public static getInstance(): LoginUserValidatorFactory {
    if (!this.instance) {
      this.instance = new LoginUserValidatorFactory()
    }

    return this.instance
  }

  public make(): ValidationComposite {
    const validations: ValidatorsInterface[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequireParamValidation(field))
    }
    validations.push(new EmailValidation('email'))

    return new ValidationComposite(validations)
  }
}
