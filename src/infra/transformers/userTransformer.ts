import { UserAgreement, DataTransformer } from '@/infra/transformers'

export class UserTransformer implements UserAgreement {
  constructor(
    // private readonly dataTransformer: DataAgreement
  ) {}

  transform(params: UserAgreement.Params): UserAgreement.Response {
    const dataTransformer = new DataTransformer()

    return {
      uid: params.uid,
      email: dataTransformer.lowerCaseStringTransform(params.email),
      // subscription: params.subscription ? {} : null,
      customerUid: params.customer_uid,
      hashedPassword: params.hashed_password,
      createdAt: new Date(params.created_at),
      deletedAt: params.deleted_at ? new Date(params.deleted_at) : undefined,
    }
  }
}
