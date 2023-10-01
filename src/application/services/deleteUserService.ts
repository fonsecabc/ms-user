import { UserRepositoryContract } from '@/application/contracts/repositories'
import { DeleteUserUsecase } from '@/domain/usecases'
import { CouldNotError, NotFoundError } from '@/domain/errors'

export class DeleteUserService implements DeleteUserUsecase {
  constructor(
    private readonly userRepository: UserRepositoryContract,
  ) { }

  async perform({ uid }: DeleteUserUsecase.Params): Promise<DeleteUserUsecase.Response> {
    const user = await this.userRepository.get({ uid })
    if (!user) return new NotFoundError('user')

    if (user.subscription && user.subscription.status === 'active' ) {
      return new CouldNotError('delete user with active subscription')
    }

    const isDeleted = await this.userRepository.delete({ user })

    return isDeleted || new CouldNotError('delete user')
  }
}
