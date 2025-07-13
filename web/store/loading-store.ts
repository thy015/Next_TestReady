import { create } from 'zustand'

interface AudioLoadingState {
  isAudioLoading: boolean
  setAudioLoading: (loading: boolean) => void
  isAudioReady: boolean
  setIsAudioReady: (ready: boolean) => void
}

const useAudioLoadingStore = create<AudioLoadingState>((set) => ({
  isAudioLoading: true,
  setAudioLoading: (loading: boolean) => set({ isAudioLoading: loading }),
  isAudioReady: false,
  setIsAudioReady: (ready: boolean) => set({ isAudioReady: ready }),
}))

export { useAudioLoadingStore }
