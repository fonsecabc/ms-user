import { variables } from '@/main/config'
import { CreateCustomerService } from '@/application/tasks'

export class CreateCustomerServiceFactory {
  private static instance: CreateCustomerServiceFactory

  public static getInstance(): CreateCustomerServiceFactory {
    if (!this.instance) {
      this.instance = new CreateCustomerServiceFactory()
    }

    return this.instance
  }

  public make(): CreateCustomerService {
    return new CreateCustomerService(
      variables.paymentProcessorApiUrl,
      variables.paymentProcessorApiKey,
    )
  }
}
