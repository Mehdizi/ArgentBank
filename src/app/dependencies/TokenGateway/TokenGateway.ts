export interface TokenGateway {
  verify: (token: string) => Promise<{ validatedToken: string }>
}
