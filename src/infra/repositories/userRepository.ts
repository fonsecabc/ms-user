import { UserAgreement } from '@/infra/transformers'
import { DatabaseConnection } from '@/infra/database/connections'
import { DatabaseError } from '@/application/errors'
import { UserRepositoryContract } from '@/application/contracts/repositories'

export class UserRepository implements UserRepositoryContract {
  constructor(
    private readonly db: DatabaseConnection,
    private readonly userTransformer: UserAgreement
  ) {}

  async create(params: UserRepositoryContract.Create.Params): Promise<UserRepositoryContract.Create.Response> {
    const { uid, email, hashedPassword } = params

    const query = `
      INSERT INTO users (
        uid,
        email,
        customer_uid,
        hashed_password,
        created_at
      ) VALUES (?, ?, ?, ?, ?)
    `

    const result = await this.db.execute(query, [uid, email, uid, hashedPassword, new Date().toISOString()])

    const user = await this.get({ uid })
    if (result.rowsAffected === 0 || !user) throw new DatabaseError('Data did not persist!')

    return user
  }

  async get(params: UserRepositoryContract.Get.Params): Promise<UserRepositoryContract.Get.Response> {
    const { uid } = params

    const query = `
      SELECT * FROM users WHERE uid = ?
    `

    const result = await this.db.execute<UserAgreement.Params>(query, [uid])
    if (result.rows.length === 0) return undefined

    return this.userTransformer.transform(result.rows[0])
  }

  async getByEmail(params: UserRepositoryContract.GetByEmail.Params): Promise<UserRepositoryContract.GetByEmail.Response> {
    const { email } = params

    const query = `
      SELECT * FROM users WHERE email = ?
    `

    const result = await this.db.execute<UserAgreement.Params>(query, [email])
    if (result.rows.length === 0) return undefined

    return this.userTransformer.transform(result.rows[0])
  }

  async update(params: UserRepositoryContract.Update.Params): Promise<UserRepositoryContract.Update.Response> {
    const { uid, field, value } = params

    const fields = {
      customerUid: 'customer_uid',
      email: 'email',
      hashedPassword: 'hashed_password',
    }

    const query = `
      UPDATE users
      SET ${fields[field]} = ?
      WHERE uid = ?
    `

    const result = await this.db.execute(query, [value, uid])
    if (result.rowsAffected === 0) throw new DatabaseError('Data did not persist!')

    return true
  }

  async delete(params: UserRepositoryContract.Delete.Params): Promise<UserRepositoryContract.Delete.Response> {
    const { uid } = params

    const query = `
      UPDATE users
      SET deleted_at = ?
      WHERE uid = ?
      AND deleted_at IS NULL
    `

    const result = await this.db.execute(query, [new Date().toISOString(), uid])
    if (result.rowsAffected === 0) throw new DatabaseError('Data did not persist!')

    return true
  }
}
