import { User } from '@/domain/entities'

export interface GenerateAccessTokenTreaty {
  perform(params: GenerateAccessTokenTreaty.Params): Promise<GenerateAccessTokenTreaty.Response>
}

export namespace GenerateAccessTokenTreaty {
  export type Params = {
    user: User
  }

  export type Response = string
}
