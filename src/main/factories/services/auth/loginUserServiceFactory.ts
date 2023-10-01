import { CryptoAdapterFactory } from '@/main/factories/adapters'
import { UserRepositoryFactory } from '@/main/factories/repositories'
import { GenerateAccessTokenTaskFactory } from '@/main/factories/tasks'
import { LoginUserService } from '@/application/services'

export class LoginUserServiceFactory {
  private static instance: LoginUserServiceFactory

  public static getInstance(): LoginUserServiceFactory {
    if (!this.instance) {
      this.instance = new LoginUserServiceFactory()
    }

    return this.instance
  }

  public make(): LoginUserService {
    return new LoginUserService(
      UserRepositoryFactory.getInstance().make(),
      CryptoAdapterFactory.getInstance().make(),
      GenerateAccessTokenTaskFactory.getInstance().make()
    )
  }
}
