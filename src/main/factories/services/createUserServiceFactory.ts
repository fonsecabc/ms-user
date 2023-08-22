import { UserRepositoryFactory } from '..'
import { CreateUserService } from '../../../application/services'
import { CreateCustomerServiceFactory } from './tasks/createCustomerServiceFactory'

export class CreateUserServiceFactory {
  private static instance: CreateUserServiceFactory

  public static getInstance(): CreateUserServiceFactory {
    if (!this.instance) {
      this.instance = new CreateUserServiceFactory()
    }

    return this.instance
  }

  public make(): CreateUserService {
    return new CreateUserService(
      UserRepositoryFactory.getInstance().make(),
      CreateCustomerServiceFactory.getInstance().make()
    )
  }
}
