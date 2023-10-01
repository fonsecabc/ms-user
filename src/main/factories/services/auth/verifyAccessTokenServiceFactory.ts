import { AuthenticationRepositoryFactory } from '@/main/factories/repositories'
import { VerifyAccessTokenService } from '@/application/tasks'

export class VerifyAccessTokenServiceFactory {
  private static instance: VerifyAccessTokenServiceFactory

  public static getInstance(): VerifyAccessTokenServiceFactory {
    if (!this.instance) {
      this.instance = new VerifyAccessTokenServiceFactory()
    }

    return this.instance
  }

  public make(): VerifyAccessTokenService {
    return new VerifyAccessTokenService(
      AuthenticationRepositoryFactory.getInstance().make()
    )
  }
}
