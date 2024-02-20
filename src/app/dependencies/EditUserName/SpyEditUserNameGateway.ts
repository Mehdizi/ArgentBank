import { EditNameProps, EditUserNameGateway } from "./EditUserNameGateway";

export class SpyEditUserNameGateway implements EditUserNameGateway {
  private args?: EditNameProps[] = []

  get Args() {
    return this.args
  }

  execute(props: EditNameProps) {
    this.args!.push(props);
    return Promise.resolve();
  }
}