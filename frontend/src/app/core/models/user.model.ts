export type UserRole = 'ADMIN' | 'END_USER' | 'USER';

export type AuthProvider = 'GOOGLE' | 'PHONE' | 'EMAIL' | 'ADMIN' | 'MOCK';

export interface User {
  id: string;
  name?: string;
  fullName: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  authenticationProvider: AuthProvider;
  role: UserRole;
  createdAt?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
  message?: string;
}

export interface OtpResponse {
  success: boolean;
  message?: string;
  error?: string;
  cooldownSeconds?: number;
  expiresInSeconds?: number;
}
