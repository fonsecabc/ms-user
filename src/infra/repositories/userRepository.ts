import { User } from '@/domain/entities'
import { UserRepositoryContract } from '@/application/contracts/repositories'

import { firestore } from 'firebase-admin'

export class UserRepository implements UserRepositoryContract {
  private readonly usersRef: firestore.CollectionReference

  constructor(
    private readonly db: firestore.Firestore
  ) {
    this.usersRef = this.db.collection('users')
  }

  async create(params: UserRepositoryContract.Create.Params): Promise<UserRepositoryContract.Create.Response> {
    const { uid, email, hashedPassword } = params
    const user: User = { uid, email, createdAt: new Date(), customerUid: '', hashedPassword }

    return this.usersRef.doc(uid).create(user).then(() => user)
  }

  async update(params: UserRepositoryContract.Update.Params): Promise<UserRepositoryContract.Update.Response> {
    const { uid, attrs } = params

    const user = await this.get({ uid })
    if (!user) return false

    return !!await this.usersRef.doc(uid).update(attrs)
  }

  async get(params: UserRepositoryContract.Get.Params): Promise<UserRepositoryContract.Get.Response> {
    const { uid } = params
    const user: User = (await this.usersRef.doc(uid).get()).data() as User

    return user
  }

  async getByEmail(params: UserRepositoryContract.GetByEmail.Params): Promise<UserRepositoryContract.GetByEmail.Response> {
    const { email } = params
    const user: User = (await this.usersRef.where('email', '==', email).get()).docs.shift()?.data() as User

    return user
  }

  async delete({ user }: UserRepositoryContract.Delete.Params): Promise<UserRepositoryContract.Delete.Response> {
    const uid = user.uid
    user.deletedAt = new Date()

    await this.db.collection('deleted_users').doc(uid).create(user)
    await this.usersRef.doc(uid).delete()

    return true
  }
}
