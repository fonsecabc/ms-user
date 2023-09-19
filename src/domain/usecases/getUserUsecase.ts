import { User } from '../entities'

export interface GetUserUsecase {
    perform(params: GetUserUsecase.Params): Promise<GetUserUsecase.Response>
}
export namespace GetUserUsecase {
    export type Params = {
        uid: string
    }

    export type Response = User | Error
}
