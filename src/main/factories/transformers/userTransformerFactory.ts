// import { DataTransformerFactory } from '@/main/factories/transformers'
import { UserTransformer } from '@/infra/transformers'

export class UserTransformerFactory {
  private static instance: UserTransformerFactory

  public static getInstance(): UserTransformerFactory {
    if (!this.instance) {
      this.instance = new UserTransformerFactory()
    }

    return this.instance
  }

  public make(): UserTransformer {
    return new UserTransformer(
      // DataTransformerFactory.getInstance().make()
    )
  }
}
