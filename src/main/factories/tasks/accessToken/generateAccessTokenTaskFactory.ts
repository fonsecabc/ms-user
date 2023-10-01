import { JwtAdapterFactory } from '@/main/factories/adapters'
import { GenerateAccessTokenTask } from '@/application/tasks'

export class GenerateAccessTokenTaskFactory {
  private static instance: GenerateAccessTokenTaskFactory

  public static getInstance(): GenerateAccessTokenTaskFactory {
    if (!this.instance) {
      this.instance = new GenerateAccessTokenTaskFactory()
    }

    return this.instance
  }

  public make(): GenerateAccessTokenTask {
    return new GenerateAccessTokenTask(
      JwtAdapterFactory.getInstance().make()
    )
  }
}
