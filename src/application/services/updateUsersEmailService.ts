import { UserRepositoryContract } from '@/application/contracts/repositories'
import { UpdateUsersEmailUsecase } from '@/domain/usecases'
import { EntityAlreadyExistsError, NotFoundError } from '@/domain/errors'

export class UpdateUsersEmailService implements UpdateUsersEmailUsecase {
  constructor(
    private readonly userRepository: UserRepositoryContract,
  ) { }

  async perform(params: UpdateUsersEmailUsecase.Params): Promise<UpdateUsersEmailUsecase.Response> {
    const { uid, email } = params

    const isEmailAlreadyInUse = await this.userRepository.getByEmail({ email })
    if (isEmailAlreadyInUse) return new EntityAlreadyExistsError('User')

    const isUpdated = await this.userRepository.update({
      uid,
      field: 'email',
      value: email,
    })

    return isUpdated || new NotFoundError('user')
  }
}
