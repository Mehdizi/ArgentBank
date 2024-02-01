export type Credentials = {
  email: string,
  password: string
}

export interface AuthenticationGateway {
  login: ({ email, password }: Credentials) => Promise<{ token: string }>
}