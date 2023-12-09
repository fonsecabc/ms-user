import { CryptoAdapterContract } from '@/application/contracts/adapters'
import { UserRepositoryContract } from '@/application/contracts/repositories'
import { NotFoundError } from '@/domain/errors'
import { UpdateUsersPasswordUsecase } from '@/domain/usecases'

export class UpdateUsersPasswordService implements UpdateUsersPasswordUsecase {
  constructor(
    private readonly userRepository: UserRepositoryContract,
    private readonly cryptoAdapter: CryptoAdapterContract
  ) { }

  async perform(params: UpdateUsersPasswordUsecase.Params): Promise<UpdateUsersPasswordUsecase.Response> {
    const { uid, email, password } = params

    const user = await this.userRepository.getByEmail({ email })
    if (!user) return new NotFoundError('user')

    const hashedPassword = await this.cryptoAdapter.hashPassword(password)

    const isUpdated = await this.userRepository.update({
      uid,
      field: 'hashedPassword',
      value: hashedPassword,
    })

    return isUpdated || new NotFoundError('user')
  }
}
