import { create } from 'zustand/react'

interface AuthState {
  userId: number | null
  username: string
  email: string
  password: string
  bio: string
  avatar: string
  role: string
  createdAt: Date
  updatedAt: Date
  setAuth: (auth: Partial<AuthState>) => void
  resetAuth: () => void
  updateField: (field: keyof AuthState, value: any) => void
  deleteField: (field: keyof AuthState) => void
  getField: (field: keyof AuthState) => any
}

const useAuthStore = create<AuthState>((set, get) => ({
  userId: null,
  username: '',
  email: '',
  password: '',
  bio: '',
  avatar: '',
  role: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  setAuth: auth => set(state => ({ ...state, ...auth })),
  resetAuth: () =>
    set({
      userId: null,
      username: '',
      email: '',
      password: '',
      bio: '',
      avatar: '',
      role: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  updateField: (field, value) => set(state => ({ ...state, [field]: value })),
  deleteField: field =>
    set(state => {
      const newState = { ...state }
      delete newState[field]
      return newState
    }),
  getField: field => get()[field],
}))

export default useAuthStore
