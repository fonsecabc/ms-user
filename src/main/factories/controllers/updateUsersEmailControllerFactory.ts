import { UpdateUsersEmailServiceFactory } from '@/main/factories/services'
import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'
import { UpdateUsersEmailValidatorFactory } from '@/main/factories/validators'
import { UpdateUsersEmailController } from '@/presentation/controllers'

export class UpdateUsersEmailControllerFactory {
  private static instance: UpdateUsersEmailControllerFactory

  public static getInstance(): UpdateUsersEmailControllerFactory {
    if (!this.instance) {
      this.instance = new UpdateUsersEmailControllerFactory()
    }

    return this.instance
  }

  public make(): UpdateUsersEmailController {
    return new UpdateUsersEmailController(
      UpdateUsersEmailValidatorFactory.getInstance().make(),
      VerifyAccessTokenTaskFactory.getInstance().make(),
      UpdateUsersEmailServiceFactory.getInstance().make()
    )
  }
}
