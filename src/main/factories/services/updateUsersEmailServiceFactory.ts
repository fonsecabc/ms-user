import { UserRepositoryFactory } from '@/main/factories'
import { UpdateUsersEmailService } from '@/application/services'

export class UpdateUsersEmailServiceFactory {
  private static instance: UpdateUsersEmailServiceFactory

  public static getInstance(): UpdateUsersEmailServiceFactory {
    if (!this.instance) {
      this.instance = new UpdateUsersEmailServiceFactory()
    }

    return this.instance
  }

  public make(): UpdateUsersEmailService {
    return new UpdateUsersEmailService(
      UserRepositoryFactory.getInstance().make()
    )
  }
}
