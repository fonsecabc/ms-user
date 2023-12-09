import { User } from '@/domain/entities'

export interface UserAgreement {
  transform: (params: UserAgreement.Params) => UserAgreement.Response
}

export namespace UserAgreement {
  export type Params = {
    uid: string
    email: string
    // subscription: {} | null
    customer_uid: string
    hashed_password: string
    created_at: string
    deleted_at: string | null
  }

  export type Response = User
}
