export type UserRole = 'system_admin' | 'house_admin' | 'member'

export type AuthScreen = 'login' | 'register' | 'pending' | 'app'

export type SessionUser = {
  name: string
  email: string
  role: UserRole
}
