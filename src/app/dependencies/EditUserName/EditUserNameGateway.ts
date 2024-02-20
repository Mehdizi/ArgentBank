export type EditNameProps = {
  newFirstName: string,
  newLastName: string,
  token: string
}

export interface EditUserNameGateway {
  execute: ({ newFirstName, newLastName, token }: EditNameProps,) => Promise<void>
}