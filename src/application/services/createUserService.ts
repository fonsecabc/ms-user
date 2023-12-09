import { CreateCustomerTreaty } from '@/application/tasks'
import { CryptoAdapterContract } from '@/application/contracts/adapters'
import { UserRepositoryContract } from '@/application/contracts/repositories'
import { CreateUserUsecase } from '@/domain/usecases'
import { EntityAlreadyExistsError } from '@/domain/errors'

export class CreateUserService implements CreateUserUsecase {
  constructor(
    private readonly userRepository: UserRepositoryContract,
    private readonly cryptoAdapter: CryptoAdapterContract,
    private readonly createCustomerTask: CreateCustomerTreaty
  ) { }

  async perform({ email, password }: CreateUserUsecase.Params): Promise<CreateUserUsecase.Response> {
    const isUserAlreadyRegistered = await this.userRepository.getByEmail({ email })
    if (isUserAlreadyRegistered) return new EntityAlreadyExistsError('User')

    const hashedPassword = await this.cryptoAdapter.hashPassword(password)
    const uid = await this.cryptoAdapter.generateUuid()

    const user = await this.userRepository.create({ uid, email, hashedPassword })
    const customer = await this.createCustomerTask.perform({ email, userUid: user.uid })
    await this.userRepository.update({ uid: user.uid, field: 'customerUid', value: customer.id })

    if (user.hashedPassword) delete user.hashedPassword

    return {
      ...user,
      customerUid: customer.id,
    }
  }
}
