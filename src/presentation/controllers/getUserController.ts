import {
  GetUserValidatorFactory,
  GetUserServiceFactory,
} from '@/main/factories'
import { User } from '@/domain/entities'
import { InvalidParamError, NotFoundError } from '@/domain/errors'
import { HttpResponse, invalidParams, notFound, success } from '@/presentation/helpers'

type Request = {
  uid: string
}

export async function getUserController(request: Request): Promise<HttpResponse<User | Error>> {
  const isValid = await GetUserValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const user = await GetUserServiceFactory.getInstance().make().perform(request)
  if (user instanceof InvalidParamError) return invalidParams(user)
  if (user instanceof NotFoundError) return notFound(user)

  return success(user)
}
