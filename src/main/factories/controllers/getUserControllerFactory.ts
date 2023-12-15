import { GetUserServiceFactory } from '@/main/factories/services'
import { GetUserValidatorFactory } from '@/main/factories/validators'
import { GetUserController } from '@/presentation/controllers'

export class GetUserControllerFactory {
  private static instance: GetUserControllerFactory

  public static getInstance(): GetUserControllerFactory {
    if (!this.instance) {
      this.instance = new GetUserControllerFactory()
    }

    return this.instance
  }

  public make(): GetUserController {
    return new GetUserController(
      GetUserValidatorFactory.getInstance().make(),
      GetUserServiceFactory.getInstance().make()
    )
  }
}
