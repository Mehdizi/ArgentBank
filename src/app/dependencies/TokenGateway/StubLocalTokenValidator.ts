import { TokenValidator } from "./TokenValidator";

export class StubLocalTokenValidator implements TokenValidator {
  verify(token: string) {
    return Promise.resolve({ validatedToken: token })
  }

}