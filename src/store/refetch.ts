import { createImmerStore } from '@/store/factory.ts'

interface RefetchState {
  refetchPendingList: (() => void) | null
  refetchApprovedList: (() => void) | null
  refetchRejectedList: (() => void) | null
  refetchAll: (() => void) | null
  refetchStatus: (() => void) | null
}

interface RefetchActions {
  setRefetchPendingList: (refetch: RefetchState['refetchPendingList']) => void
  setRefetchApprovedList: (refetch: RefetchState['refetchApprovedList']) => void
  setRefetchRejectedList: (refetch: RefetchState['refetchRejectedList']) => void
  setRefetchStatus: (refetch: RefetchState['refetchStatus']) => void
}

export const useRefetchStore = createImmerStore<RefetchState, RefetchActions>(
  {
    refetchPendingList: null,
    refetchApprovedList: null,
    refetchRejectedList: null,
    refetchAll() {
      this.refetchPendingList?.()
      this.refetchApprovedList?.()
      this.refetchRejectedList?.()
      this.refetchStatus?.()
    },
    refetchStatus: null,
  },
  set => ({
    setRefetchPendingList: refetchState => {
      set(state => {
        state.refetchPendingList = refetchState
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
