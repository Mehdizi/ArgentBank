import { TokenGateway } from "./TokenGateway";


export class AxiosTokenGateway implements TokenGateway {
  async verify(token: string) {

    return { validatedToken: token }
  }

}
