import axios from "axios";
import { UserGateway } from "../../features/authenticateUser/authenticateUser";
import { User } from "../../slices/user";

export class AxiosUserGateway implements UserGateway {
  async loadProfile(token: string) {
    const { id, firstName, lastName }: User = (await axios.post(
      "http://localhost:3001/api/v1/user/profile",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )).data.body
    return { id, firstName, lastName }
  }
}