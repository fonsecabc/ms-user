import { HttpResponse, invalidParams, notFound, success, unathorized } from '@/presentation/helpers'
import { InvalidParamError, NotFoundError } from '@/domain/errors'
import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'
import { UpdateUsersPasswordServiceFactory } from '@/main/factories/services'
import { UpdateUsersPasswordValidatorFactory } from '@/main/factories/validators'

type Request = {
  accessToken: string
  uid: string
  email: string
  password: string
}

export async function updateUsersPassowrdController(request: Request): Promise<HttpResponse<true | Error>> {
  const isValid = await UpdateUsersPasswordValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const isTokenValid = await VerifyAccessTokenTaskFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

  const isUpdated = await UpdateUsersPasswordServiceFactory.getInstance().make().perform(request)
  if (isUpdated instanceof NotFoundError) return notFound(isUpdated)

  return success(isUpdated)
}
