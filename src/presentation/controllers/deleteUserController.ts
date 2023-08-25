import {
  DeleteUserValidatorFactory,
  DeleteUserServiceFactory,
} from '../../main/factories'
import { InvalidParamError } from '../errors'
import { HttpResponse, invalidParams, notFound, success } from '../helpers'

type Request = {
  uid: string
}

export async function deleteUserController(request: Request): Promise<HttpResponse<true | Error>> {
  const isValid = await DeleteUserValidatorFactory.getInstance().make().validate(request)
  if (isValid instanceof InvalidParamError) return invalidParams(isValid)

  const isDeleted = await DeleteUserServiceFactory.getInstance().make().perform(request)
  if (!isDeleted) return notFound(isDeleted)

  return success(isDeleted)
}
