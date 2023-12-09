import { HttpResponse, badRequest, invalidParams, notFound, success, unathorized } from '@/presentation/helpers'
import { NotFoundError, InvalidParamError } from '@/domain/errors'
import {
  DeleteUserValidatorFactory,
  DeleteUserServiceFactory,
} from '@/main/factories'
import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'

type Request = {
  accessToken: string
  uid: string
}

export async function deleteUserController(request: Request): Promise<HttpResponse<true | Error>> {
  const isValid = await DeleteUserValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)


  const isTokenValid = await VerifyAccessTokenTaskFactory.getInstance().make().perform(request)
  if (isTokenValid instanceof InvalidParamError) return unathorized(isTokenValid)

  const isDeleted = await DeleteUserServiceFactory.getInstance().make().perform(request)
  if (isDeleted instanceof NotFoundError) return notFound(isDeleted)

  return isDeleted instanceof Error ?
    badRequest(isDeleted) :
    success(isDeleted)
}
