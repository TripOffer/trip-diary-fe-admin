import { create, StoreApi } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

//value为函数的object
type ActionsType = {
  [key: string]: (...args: any[]) => void
}

type StoreApiGet<T, K> = K extends keyof T ? T[K] : never

export const createPersistedStore = <State extends object, Actions extends object>(
  key: string,
  initValues: State,
  actions?: (set: StoreApi<State & Actions>['setState']) => Actions
) => {
  return create<Actions & State>(
    persist(
      immer<Actions & State>(set => ({
        ...initValues,
        ...actions?.(set),
      })),
      {
        name: key,
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
}

export const createImmerStore = <State extends object, Actions extends object>(
  initValues: State,
  actions?: (set: StoreApi<State & Actions>['setState']) => Actions
) => {
  return create(
    immer<Actions & State>(set => ({
      ...initValues,
      ...actions?.(set),
    }))
  )
}
