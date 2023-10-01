import { UserRepositoryContract } from '@/application/contracts'
import { CreateCustomerUsecase, CreateUserUsecase } from '@/domain/usecases'

export class CreateUserService implements CreateUserUsecase {
  constructor(
    private readonly userRepository: UserRepositoryContract,
    //    private readonly encryptPasswordService: EncryptPasswordUsecase,
    private readonly createCustomerService: CreateCustomerUsecase
  ) { }

  async perform({ email, password }: CreateUserUsecase.Params): Promise<CreateUserUsecase.Response> {
    //    const encryptedPassword = await this.encryptPasswordService.perform({ password })

    const user = await this.userRepository.create({ email, password })
    const customer = await this.createCustomerService.perform({ email, userUid: user.uid })
    await this.userRepository.update({ uid: user.uid, attrs: { customerUid: customer.id } })

    return {
      ...user,
      customerUid: customer.id,
    }
  }
}
