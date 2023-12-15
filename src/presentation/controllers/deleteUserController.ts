import { Validation } from '@/presentation/interfaces'
import { Controller } from '@/presentation/controllers'
import { HttpResponse, badRequest, invalidParams, success, unathorized } from '@/presentation/helpers'
import { DeleteUserUsecase } from '@/domain/usecases'
import { VerifyAccessTokenTreaty } from '@/application/tasks'

type Request = {
  accessToken: string
  uid: string
}
export class DeleteUserController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly verifyAcessTokenTask: VerifyAccessTokenTreaty,
    private readonly deleteUserService: DeleteUserUsecase
  ) {
    super()
  }
  
  override async perform(request: Request): Promise<HttpResponse> {
    const isValid = await this.validation.validate(request)
    if (isValid instanceof Error) return invalidParams(isValid)

    const isTokenValid = await this.verifyAcessTokenTask.perform(request)
    if (isTokenValid instanceof Error) return unathorized(isTokenValid)

    const result = await this.deleteUserService.perform(request)
    if (result instanceof Error) return badRequest(result)

    return success(result)
  }
}
