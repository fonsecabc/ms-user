import { Validation } from '@/presentation/interfaces'
import { Controller } from '@/presentation/controllers'
import { HttpResponse, badRequest, invalidParams, success } from '@/presentation/helpers'
import { CreateUserUsecase } from '@/domain/usecases'

type Request = {
  email: string
  password: string
}
export class CreateUserController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly createUserService: CreateUserUsecase
  ) {
    super()
  }
  
  override async perform(request: Request): Promise<HttpResponse> {
    const isValid = await this.validation.validate(request)
    if (isValid instanceof Error) return invalidParams(isValid)

    const result = await this.createUserService.perform(request)
    if (result instanceof Error) return badRequest(result)

    return success(result)
  }
}