import {
  ValidatorsInterface,
  ValidationComposite,
  RequireParamValidation,
} from '@/infra/validators'


export class UpdateUsersPasswordValidatorFactory {
  private static instance: UpdateUsersPasswordValidatorFactory

  public static getInstance(): UpdateUsersPasswordValidatorFactory {
    if (!this.instance) {
      this.instance = new UpdateUsersPasswordValidatorFactory()
    }

    return this.instance
  }

  public make(): ValidationComposite {
    const validations: ValidatorsInterface[] = []
    for (const field of ['accessToken', 'uid', 'password']) {
      validations.push(new RequireParamValidation(field))
    }

    return new ValidationComposite(validations)
  }
}
