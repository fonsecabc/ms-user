import { NotFoundError } from '@/domain/errors'
import { UserRepositoryContract } from '@/application/contracts/repositories'
import { UpdateUserUsecase } from '@/domain/usecases'

export class UpdateUserService implements UpdateUserUsecase {
  constructor(
    private readonly userRepository: UserRepositoryContract,
  ) { }

  async perform(params: UpdateUserUsecase.Params): Promise<UpdateUserUsecase.Response> {
    const isUpdated = await this.userRepository.update(params)

    return isUpdated || new NotFoundError('user')
  }
}
