import { HttpResponse, invalidParams, notFound, success, unathorized } from '@/presentation/helpers'
import { InvalidParamError, NotFoundError } from '@/domain/errors'
import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'
import { UpdateUsersEmailServiceFactory } from '@/main/factories/services'
import { UpdateUsersEmailValidatorFactory } from '@/main/factories/validators'

type Request = {
  accessToken: string
  uid: string
  email: string
}

export async function updateUsersEmailController(request: Request): Promise<HttpResponse<true | Error>> {
  const isValid = await UpdateUsersEmailValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const isTokenValid = await VerifyAccessTokenTaskFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

  const isUpdated = await UpdateUsersEmailServiceFactory.getInstance().make().perform(request)
  if (isUpdated instanceof NotFoundError) return notFound(isUpdated)

  return success(isUpdated)
}
