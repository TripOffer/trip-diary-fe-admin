import { createImmerStore } from '@/store/factory.ts'

interface RefetchState {
  refetchWaitingList: (() => void) | null
  refetchApprovedList: (() => void) | null
  refetchRejectedList: (() => void) | null
  refetchAll: (() => void) | null
  refetchStatus: (() => void) | null
}

interface RefetchActions {
  setRefetchWaitingList: (refetch: RefetchState['refetchWaitingList']) => void
  setRefetchApprovedList: (refetch: RefetchState['refetchApprovedList']) => void
  setRefetchRejectedList: (refetch: RefetchState['refetchRejectedList']) => void
  setRefetchStatus: (refetch: RefetchState['refetchStatus']) => void
}

export const useRefetchStore = createImmerStore<RefetchState, RefetchActions>(
  {
    refetchWaitingList: null,
    refetchApprovedList: null,
    refetchRejectedList: null,
    refetchAll() {
      this.refetchWaitingList?.()
      this.refetchApprovedList?.()
      this.refetchRejectedList?.()
      this.refetchStatus?.()
    },
    refetchStatus: null,
  },
  set => ({
    setRefetchWaitingList: refetchState => {
      set(state => {
        state.refetchWaitingList = refetchState
      })
    },
    setRefetchApprovedList: refetchState => {
      set(state => {
        state.refetchApprovedList = refetchState
      })
    },
    setRefetchRejectedList: refetchState => {
      set(state => {
        state.refetchRejectedList = refetchState
      })
    },
    setRefetchStatus: refetchState => {
      set(state => {
        state.refetchStatus = refetchState
      })
    },
  })
)
