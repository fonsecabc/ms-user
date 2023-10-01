import { NotFoundError } from '@/domain/errors'
import { UserRepositoryContract } from '@/application/contracts'
import { GetUserUsecase } from '@/domain/usecases'

export class GetUserService implements GetUserUsecase {
  constructor(
    private readonly userRepository: UserRepositoryContract,
  ) { }

  async perform({ uid }: GetUserUsecase.Params): Promise<GetUserUsecase.Response> {
    const user = await this.userRepository.get({ uid })
    if (!user) return new NotFoundError('user')

    return user
  }
}
