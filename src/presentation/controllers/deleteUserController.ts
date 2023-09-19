import { NotFoundError } from '../../domain/errors'
import {
  DeleteUserValidatorFactory,
  DeleteUserServiceFactory,
} from '../../main/factories'
import { InvalidParamError } from '../errors'
import { HttpResponse, badRequest, invalidParams, notFound, success } from '../helpers'

type Request = {
  uid: string
}

export async function deleteUserController(request: Request): Promise<HttpResponse<true | Error>> {
  const isValid = await DeleteUserValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const isDeleted = await DeleteUserServiceFactory.getInstance().make().perform(request)
  if (isDeleted instanceof NotFoundError) return notFound(isDeleted)

  return isDeleted instanceof Error ?
    badRequest(isDeleted) :
    success(isDeleted)
}
