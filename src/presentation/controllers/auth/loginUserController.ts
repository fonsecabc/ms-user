import { Validation } from '@/presentation/interfaces'
import { Controller } from '@/presentation/controllers'
import { HttpResponse, badRequest, invalidParams, success } from '@/presentation/helpers'
import { LoginUserUsecase } from '@/domain/usecases'
import { InvalidParamError } from '@/domain/errors'

type Request = {
  email: string
  password: string
}
export class LoginUserController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loginUserService: LoginUserUsecase
  ) {
    super()
  }
  
  override async perform(request: Request): Promise<HttpResponse> {
    const isValid = await this.validation.validate(request)
    if (isValid instanceof Error) return invalidParams(isValid)

    const result = await this.loginUserService.perform(request)
    if (result instanceof InvalidParamError) return invalidParams(result)
    if (result instanceof Error) return badRequest(result)

    return success(result)
  }
}