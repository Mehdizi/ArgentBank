import { UserGateway } from "../../features/authenticateUser/authenticateUser";
import { User } from "../../slices/user";

export class StubUserGateway implements UserGateway {
  private firstName = ""
  private lastName = ""
  private id = ""

  feedWith({ firstName, lastName, id }: User) {
    this.firstName = firstName
    this.lastName = lastName
    this.id = id
  }

  loadProfile(token: string) {
    return Promise.resolve({ firstName: this.firstName, lastName: this.lastName, id: this.id });
  }
}


