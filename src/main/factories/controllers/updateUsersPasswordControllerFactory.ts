import { UpdateUsersPasswordServiceFactory } from '@/main/factories/services'
import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'
import { UpdateUsersPasswordValidatorFactory } from '@/main/factories/validators'
import { UpdateUsersPasswordController } from '@/presentation/controllers'

export class UpdateUsersPasswordControllerFactory {
  private static instance: UpdateUsersPasswordControllerFactory

  public static getInstance(): UpdateUsersPasswordControllerFactory {
    if (!this.instance) {
      this.instance = new UpdateUsersPasswordControllerFactory()
    }

    return this.instance
  }

  public make(): UpdateUsersPasswordController {
    return new UpdateUsersPasswordController(
      UpdateUsersPasswordValidatorFactory.getInstance().make(),
      VerifyAccessTokenTaskFactory.getInstance().make(),
      UpdateUsersPasswordServiceFactory.getInstance().make()
    )
  }
}
