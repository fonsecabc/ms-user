import { GenerateAccessTokenTreaty } from '@/application/tasks'
import { JwtAdapterContract } from '@/application/contracts/adapters'

export class GenerateAccessTokenTask implements GenerateAccessTokenTreaty {
  constructor(
    private readonly jwtAdapter: JwtAdapterContract
  ) { }

  async perform({ user }: GenerateAccessTokenTreaty.Params): Promise<GenerateAccessTokenTreaty.Response> {
    return await this.jwtAdapter.sign(user)
  }
}
