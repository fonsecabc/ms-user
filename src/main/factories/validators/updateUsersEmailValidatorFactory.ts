import {
  ValidatorsInterface,
  ValidationComposite,
  RequireParamValidation,
} from '@/infra/validators'


export class UpdateUsersEmailValidatorFactory {
  private static instance: UpdateUsersEmailValidatorFactory

  public static getInstance(): UpdateUsersEmailValidatorFactory {
    if (!this.instance) {
      this.instance = new UpdateUsersEmailValidatorFactory()
    }

    return this.instance
  }

  public make(): ValidationComposite {
    const validations: ValidatorsInterface[] = []
    for (const field of ['accessToken', 'uid', 'email']) {
      validations.push(new RequireParamValidation(field))
    }

    return new ValidationComposite(validations)
  }
}
