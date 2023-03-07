export interface IJwtConfig {
  privateKey: string;
  publicKey: string;
  expiresIn: string;
}

export const jwtConfig = (): IJwtConfig => ({
  privateKey: process.env.JWT_PRIVATE_KEY,
  publicKey: process.env.JWT_PUBLIC_KEY,
  expiresIn: process.env.JWT_EXPIRATION_TIME || '1h',
});
