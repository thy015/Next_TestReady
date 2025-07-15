import { create } from 'zustand'

interface AudioLoadingState {
  isAudioReady: boolean
  setIsAudioReady: (ready: boolean) => void
}

const useAudioLoadingStore = create<AudioLoadingState>((set) => ({
  isAudioReady: false,
  setIsAudioReady: (ready: boolean) => set({ isAudioReady: ready }),
}))

export { useAudioLoadingStore }
