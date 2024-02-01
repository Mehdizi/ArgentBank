import axios from "axios"
import { ChangeNameGateway, UserNameType } from "../../features/changeNameUser/changeNameUser";
import { User } from "../../slices/user";

export class AxiosChangeNameGateway implements ChangeNameGateway {
  async editName({ newFirstName, newLastName }: UserNameType, token: string) {
    const { firstName, lastName, id }: User = (await axios.put(
      "http://localhost:3001/api/v1/user/profile",
      { firstName: newFirstName, lastName: newLastName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )).data.body
    return { firstName, lastName, id }
  }
}
