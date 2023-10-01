import { Customer } from '@/domain/entities'

export interface CreateCustomerTreaty {
  perform(params: CreateCustomerTreaty.Params): Promise<CreateCustomerTreaty.Response>
}

export namespace CreateCustomerTreaty {
  export type Params = {
    userUid: string
    email: string
  }

  export type Response = Customer
}
