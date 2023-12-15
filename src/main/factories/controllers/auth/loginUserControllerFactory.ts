import { LoginUserServiceFactory } from '@/main/factories/services'
import { LoginUserValidatorFactory } from '@/main/factories/validators'
import { LoginUserController } from '@/presentation/controllers'

export class LoginUserControllerFactory {
  private static instance: LoginUserControllerFactory

  public static getInstance(): LoginUserControllerFactory {
    if (!this.instance) {
      this.instance = new LoginUserControllerFactory()
    }

    return this.instance
  }

  public make(): LoginUserController {
    return new LoginUserController(
      LoginUserValidatorFactory.getInstance().make(),
      LoginUserServiceFactory.getInstance().make()
    )
  }
}
