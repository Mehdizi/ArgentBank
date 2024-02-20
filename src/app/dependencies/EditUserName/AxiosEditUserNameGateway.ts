import axios from "axios"
import { EditNameProps, EditUserNameGateway } from "./EditUserNameGateway";

export class AxiosEditUserNameGateway implements EditUserNameGateway {
  async execute({ newFirstName, newLastName, token }: EditNameProps) {
    await axios.put(
      "http://localhost:3001/api/v1/user/profile",
      { firstName: newFirstName, lastName: newLastName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  }
}
