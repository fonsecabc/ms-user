import { DeleteUserServiceFactory } from '@/main/factories/services'
import { VerifyAccessTokenTaskFactory } from '@/main/factories/tasks'
import { DeleteUserValidatorFactory } from '@/main/factories/validators'
import { DeleteUserController } from '@/presentation/controllers'

export class DeleteUserControllerFactory {
  private static instance: DeleteUserControllerFactory

  public static getInstance(): DeleteUserControllerFactory {
    if (!this.instance) {
      this.instance = new DeleteUserControllerFactory()
    }

    return this.instance
  }

  public make(): DeleteUserController {
    return new DeleteUserController(
      DeleteUserValidatorFactory.getInstance().make(),
      VerifyAccessTokenTaskFactory.getInstance().make(),
      DeleteUserServiceFactory.getInstance().make()
    )
  }
}
