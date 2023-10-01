import { Customer } from '@/domain/entities'
import { CreateCustomerUsecase } from '@/domain/usecases'
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
        // The following fields are required by the payment processor API but are not used by the application
        // so we can just hardcode them.
        phones: { home_phone: { country_code: '55', area_code: '31', number: '000000000' } },
        birthdate: '05/03/1984',
        document: '93095135270',
        document_type: 'cpf',
        type: 'individual',
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
