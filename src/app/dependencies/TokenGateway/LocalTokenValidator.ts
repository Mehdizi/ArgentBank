import { TokenValidator } from "./TokenValidator";
import isJwtTokenExpired from 'jwt-check-expiry';

export class LocalTokenValidator implements TokenValidator {
  async verify(token: string) {
    return { validatedToken: !isJwtTokenExpired(token) ? token : "", }
  }
}
