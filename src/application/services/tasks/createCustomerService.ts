import { Customer } from '../../../domain/entities'
import { CreateCustomerUsecase } from '../../../domain/usecases'
import axios from 'axios'

export class CreateCustomerService implements CreateCustomerUsecase {
  constructor(
        private readonly paymentProcessorApiUrl: string,
        private readonly paymentProcessorApiKey: string,
  ) { }

  async perform({ email, userUid }: CreateCustomerUsecase.Params): Promise<CreateCustomerUsecase.Response> {
    const response = await axios.request<Customer>({
      url: `${this.paymentProcessorApiUrl}/customers`,
      method: 'POST',
      data: {
        email,
        name: `${userUid}-${email}`,
      },
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'authorization': 'Basic ' + this.paymentProcessorApiKey,
      },
    })

    return response.data
  }
}
