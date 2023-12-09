import { databaseConnections } from '@/main/config'
import { UserTransformerFactory } from '@/main/factories/transformers'
import { UserRepository } from '@/infra/repositories'

export class UserRepositoryFactory {
  private static instance: UserRepositoryFactory

  public static getInstance(): UserRepositoryFactory {
    if (!this.instance) {
      this.instance = new UserRepositoryFactory()
    }

    return this.instance
  }

  public make(): UserRepository {
    return new UserRepository(
      databaseConnections.sqlite,
      UserTransformerFactory.getInstance().make()
    )
  }
}
