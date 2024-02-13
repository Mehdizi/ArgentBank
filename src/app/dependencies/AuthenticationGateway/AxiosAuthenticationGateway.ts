import { AuthenticationGateway, Credentials } from "./authenticationGateway";

import axios from "axios"

export class AxiosAuthenticationGateway implements AuthenticationGateway {
  async login({ email, password }: Credentials) {

    return {
      token: (await axios.post("http://localhost:3001/api/v1/user/login", {
        email, password
      })).data.body.token
    }

  }
}


