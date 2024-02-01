import { AuthenticationGateway, Credentials } from "./authenticationGateway"


export class StubAuthenticationGateway implements AuthenticationGateway {

  private token = ""

  feedWith(token: string) {
    this.token = token
  }

  async login({ email, password }: Credentials) {
    return Promise.resolve({ token: this.token })
  }
}