import { Customer } from '../../entities'

export interface CreateCustomerUsecase {
    perform(params: CreateCustomerUsecase.Params): Promise<CreateCustomerUsecase.Response>
}

export namespace CreateCustomerUsecase {
    export type Params = {
        userUid: string
        email: string
    }

    export type Response = Customer
}
