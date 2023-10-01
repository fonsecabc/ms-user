// import { Customer } from '@/domain/entities'
import { EncryptPasswordUsecase } from '@/domain/usecases'

export class EncryptPasswordTask implements EncryptPasswordUsecase {
  constructor() { }

  async perform({ password }: EncryptPasswordUsecase.Params): Promise<EncryptPasswordUsecase.Response> {
    return ''
  }
}
