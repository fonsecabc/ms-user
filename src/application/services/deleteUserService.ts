import { UserRepositoryContract } from '../contracts'
import { DeleteUserUsecase } from '../../domain/usecases'
import { NotFoundError } from '../../domain/errors'

export class DeleteUserService implements DeleteUserUsecase {
  constructor(
    private readonly userRepository: UserRepositoryContract,
  ) { }

  async perform(params: DeleteUserUsecase.Params): Promise<DeleteUserUsecase.Response> {
    const isDeleted = await this.userRepository.delete(params)

    return isDeleted || new NotFoundError('user')
  }
}
