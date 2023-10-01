import { variables } from '@/main/config'
import { CreateCustomerTask } from '@/application/tasks'

export class CreateCustomerServiceFactory {
  private static instance: CreateCustomerServiceFactory

  public static getInstance(): CreateCustomerServiceFactory {
    if (!this.instance) {
      this.instance = new CreateCustomerServiceFactory()
    }

    return this.instance
  }

  public make(): CreateCustomerTask {
    return new CreateCustomerTask(
      variables.paymentProcessorApiUrl,
      variables.paymentProcessorApiKey,
    )
  }
}
