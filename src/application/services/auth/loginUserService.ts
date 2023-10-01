import { GenerateAccessTokenTreaty } from '@/application/tasks'
import { CryptoAdapterContract } from '@/application/contracts/adapters'
import { UserRepositoryContract } from '@/application/contracts/repositories'
import { LoginUserUsecase } from '@/domain/usecases'
import { CouldNotError, InvalidParamError } from '@/domain/errors'

export class LoginUserService implements LoginUserUsecase {
  constructor(
    private readonly userRepository: UserRepositoryContract,
    private readonly cryptoAdapter: CryptoAdapterContract,
    private readonly generateAccessTokenTask: GenerateAccessTokenTreaty
  ) { }

  async perform({ email, password }: LoginUserUsecase.Params): Promise<LoginUserUsecase.Response> {
    const user = await this.userRepository.getByEmail({ email })
    if (!user) return new InvalidParamError('email')
    if (!user.hashedPassword) return new CouldNotError('login')

    const isPasswordValid = await this.cryptoAdapter.comparePasswords(password, user.hashedPassword)
    if (!isPasswordValid) return new InvalidParamError('password')

    if (user.hashedPassword) delete user.hashedPassword

    const accessToken = await this.generateAccessTokenTask.perform({ user })

    return {
      accessToken,
      user,
    }
  }
}
