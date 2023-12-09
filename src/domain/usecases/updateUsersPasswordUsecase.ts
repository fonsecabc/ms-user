import { NotFoundError } from '@/domain/errors'

export interface UpdateUsersPasswordUsecase {
  perform(params: UpdateUsersPasswordUsecase.Params): Promise<UpdateUsersPasswordUsecase.Response>
}
export namespace UpdateUsersPasswordUsecase {
  export type Params = {
    uid: string
    email: string
    password: string
  }

  export type Response = true | NotFoundError
}
