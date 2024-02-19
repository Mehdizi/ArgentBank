import { TokenGateway } from "./TokenGateway";
import isJwtTokenExpired from 'jwt-check-expiry';

export class AxiosTokenGateway implements TokenGateway {
  async verify(token: string) {
    return { validatedToken: !isJwtTokenExpired(token) ? token : "", }
  }
}
