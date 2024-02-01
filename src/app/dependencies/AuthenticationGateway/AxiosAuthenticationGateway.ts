import { AuthenticationGateway, Credentials } from "./authenticationGateway";

import axios from "axios"

export class AxiosAuthenticationGateway implements AuthenticationGateway {
  async login({ email, password }: Credentials) {

    const token = await axios.post("http://localhost:3001/api/v1/user/login", {
      email, password
    }).then((res) => res.data.body.token
    )

    return { token }
  }
}