import { Validation } from '@/presentation/interfaces'
import { Controller } from '@/presentation/controllers'
import { HttpResponse, badRequest, invalidParams, notFound, success, unathorized } from '@/presentation/helpers'
import { NotFoundError } from '@/domain/errors'
import { UpdateUsersEmailUsecase } from '@/domain/usecases'
import { VerifyAccessTokenTreaty } from '@/application/tasks'

type Request = {
  accessToken: string
  uid: string
  email: string
}
export class UpdateUsersEmailController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly verifyAcessTokenTask: VerifyAccessTokenTreaty,
    private readonly updateUsersEmailService: UpdateUsersEmailUsecase
  ) {
    super()
  }
  
  override async perform(request: Request): Promise<HttpResponse> {
    const isValid = await this.validation.validate(request)
    if (isValid instanceof Error) return invalidParams(isValid)

    const isTokenValid = await this.verifyAcessTokenTask.perform(request)
    if (isTokenValid instanceof Error) return unathorized(isTokenValid)

    const result = await this.updateUsersEmailService.perform(request)
    if (result instanceof NotFoundError) return notFound(result)
    if (result instanceof Error) return badRequest(result)

    return success(result)
  }
}

