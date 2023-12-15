import { CreateUserServiceFactory } from '@/main/factories/services'
import { CreateUserValidatorFactory } from '@/main/factories/validators'
import { CreateUserController } from '@/presentation/controllers'

export class CreateUserControllerFactory {
  private static instance: CreateUserControllerFactory

  public static getInstance(): CreateUserControllerFactory {
    if (!this.instance) {
      this.instance = new CreateUserControllerFactory()
    }

    return this.instance
  }

  public make(): CreateUserController {
    return new CreateUserController(
      CreateUserValidatorFactory.getInstance().make(),
      CreateUserServiceFactory.getInstance().make()
    )
  }
}
