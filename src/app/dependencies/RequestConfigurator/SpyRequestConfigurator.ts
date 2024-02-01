import { RequestConfigurator } from "../../features/authenticateUser/authenticateUser";

export class SpyRequestConfigurator implements RequestConfigurator {
  private args: string[] = []

  get Args() {
    return this.args;
  }
  defineToken(token: string) {
    this.args.push(token)
  };
}