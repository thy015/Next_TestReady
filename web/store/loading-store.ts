import { create } from 'zustand'

interface AudioLoadingState {
  isAudioLoading: boolean
  setAudioLoading: (loading: boolean) => void
}

export const useAudioLoadingStore = create<AudioLoadingState>((set) => ({
  isAudioLoading: true,
  setAudioLoading: (loading: boolean) => set({ isAudioLoading: loading }),
}))
