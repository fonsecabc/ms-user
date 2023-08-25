import {
  CreateUserValidatorFactory,
  CreateUserServiceFactory,
} from '../../main/factories'
import { User } from '../../domain/entities'
import { InvalidParamError } from '../errors'
import { HttpResponse, invalidParams, success } from '../helpers'

type Request = {
  email: string
  password: string
}

export async function createUserController(request: Request): Promise<HttpResponse<User | InvalidParamError>> {
  const isValid = await CreateUserValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const user = await CreateUserServiceFactory.getInstance().make().perform(request)

  return success(user)
}
