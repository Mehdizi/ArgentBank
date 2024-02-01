import { AuthenticationGateway, Credentials } from "./authenticationGateway";

export class ExceptionAuthenticationGateway implements AuthenticationGateway {
  async login({ email, password }: Credentials) {
    return Promise.reject()
  }
}