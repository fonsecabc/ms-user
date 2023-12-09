import { CryptoAdapterFactory } from '@/main/factories/adapters'
import { UserRepositoryFactory } from '@/main/factories/repositories'
import { UpdateUsersPasswordService } from '@/application/services'

export class UpdateUsersPasswordServiceFactory {
  private static instance: UpdateUsersPasswordServiceFactory

  public static getInstance(): UpdateUsersPasswordServiceFactory {
    if (!this.instance) {
      this.instance = new UpdateUsersPasswordServiceFactory()
    }

    return this.instance
  }

  public make(): UpdateUsersPasswordService {
    return new UpdateUsersPasswordService(
      UserRepositoryFactory.getInstance().make(),
      CryptoAdapterFactory.getInstance().make()
    )
  }
}
