import { createPersistedStore } from '@/store/factory.ts'
import { RoleEnum } from '@/constants/app.ts'

interface TokenState {
  token: string | null
  user: string | null
  email: string | null
  role: RoleEnum
}

interface TokenActions {
  setToken: (token?: string) => void
  setUser: (user?: string) => void
  setEmail: (email?: string) => void
  setRole: (role?: RoleEnum) => void
  clearToken: () => void
}

export const useTokenStore = createPersistedStore<TokenState, TokenActions>(
  'user_token',
  {
    token: null,
    user: null,
    email: null,
    role: RoleEnum.User,
  },
  set => ({
    setToken: token =>
      set(state => {
        state.token = token ?? null
      }),
    setUser: user =>
      set(state => {
        state.user = user ?? null
      }),
    setEmail: email =>
      set(state => {
        state.email = email ?? null
      }),
    setRole: role =>
      set(state => {
        state.role = role ?? RoleEnum.User
      }),
    clearToken: () =>
      set({
        token: '',
        user: '',
        email: '',
      }),
  })
)
