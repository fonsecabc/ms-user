import { NotFoundError } from '@/domain/errors'

export interface UpdateUsersEmailUsecase {
  perform(params: UpdateUsersEmailUsecase.Params): Promise<UpdateUsersEmailUsecase.Response>
}
export namespace UpdateUsersEmailUsecase {
  export type Params = {
    uid: string
    email: string
  }

  export type Response = true | NotFoundError
}
