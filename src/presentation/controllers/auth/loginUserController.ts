import {
  LoginUserValidatorFactory,
  LoginUserServiceFactory,
} from '@/main/factories'
import { User } from '@/domain/entities'
import { InvalidParamError } from '@/domain/errors'
import { HttpResponse, badRequest, invalidParams, success } from '@/presentation/helpers'

type Request = {
  email: string
  password: string
}

export async function loginUserController(request: Request): Promise<HttpResponse<{ accessToken: string, user: User } | Error>> {
  const isValid = await LoginUserValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const response = await LoginUserServiceFactory.getInstance().make().perform(request)
  if (response instanceof InvalidParamError) return invalidParams(response)

  return response instanceof Error ? badRequest(response) : success(response)
}
