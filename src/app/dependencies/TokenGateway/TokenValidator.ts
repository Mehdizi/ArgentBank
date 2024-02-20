export interface TokenValidator {
  verify: (token: string) => Promise<{ validatedToken: string }>
}
