import { Validation } from '@/presentation/interfaces'
import { Controller } from '@/presentation/controllers'
import { HttpResponse, badRequest, invalidParams, notFound, success } from '@/presentation/helpers'
import { GetUserUsecase } from '@/domain/usecases'
import { InvalidParamError, NotFoundError } from '@/domain/errors'

type Request = {
  uid: string
}
export class GetUserController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly getUserService: GetUserUsecase
  ) {
    super()
  }
  
  override async perform(request: Request): Promise<HttpResponse> {
    const isValid = await this.validation.validate(request)
    if (isValid instanceof Error) return invalidParams(isValid)

    const result = await this.getUserService.perform(request)
    if (result instanceof InvalidParamError) return invalidParams(result)
    if (result instanceof NotFoundError) return notFound(result)
    if (result instanceof Error) return badRequest(result)

    return success(result)
  }
}