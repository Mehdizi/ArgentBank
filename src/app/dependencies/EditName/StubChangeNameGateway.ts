import { ChangeNameGateway, UserNameType } from "../../features/changeNameUser/changeNameUser";

export class StubChangeNameGateway implements ChangeNameGateway {
  private id = ""

  feedWith(id: string) {
    this.id = id
  }

  editName({ newFirstName, newLastName }: UserNameType, token: string) {
    return Promise.resolve({ firstName: newFirstName, lastName: newLastName, id: this.id })
  }
}