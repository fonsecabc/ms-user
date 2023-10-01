import { User } from '@/domain/entities'

export interface LoginUserUsecase {
  perform(params: LoginUserUsecase.Params): Promise<LoginUserUsecase.Response>
}

export namespace LoginUserUsecase {
  export type Params = {
    email: string
    password: string
  }

  export type Response = {
    accessToken: string
    user: User
  } | Error
}
