import {
  UpdateUserValidatorFactory,
  UpdateUserServiceFactory,
} from '../../main/factories'
import { InvalidParamError } from '../errors'
import { NotFoundError } from '../../domain/errors'
import { HttpResponse, invalidParams, notFound, success } from '../helpers'

type Request = {
  uid: string
  attrs: object
}

export async function updateUserController(request: Request): Promise<HttpResponse<true | Error>> {
  const isValid = await UpdateUserValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const isUpdated = await UpdateUserServiceFactory.getInstance().make().perform(request)
  if (isUpdated instanceof NotFoundError) return notFound(isUpdated)

  return success(isUpdated)
}
