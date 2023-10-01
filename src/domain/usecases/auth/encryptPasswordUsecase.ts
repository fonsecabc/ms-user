export interface EncryptPasswordUsecase {
	perform(params: EncryptPasswordUsecase.Params): Promise<EncryptPasswordUsecase.Response>
}

export namespace EncryptPasswordUsecase {
	export type Params = {
		password: string
	}

	export type Response = string
}
