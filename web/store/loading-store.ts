import { create } from 'zustand'

interface AudioLoadingState {
  isAudioLoading: boolean
  setAudioLoading: (loading: boolean) => void
}

const useAudioLoadingStore = create<AudioLoadingState>((set) => ({
  isAudioLoading: true,
  setAudioLoading: (loading: boolean) => set({ isAudioLoading: loading }),
}))

interface TestState{
  currentPartIndex:number
  isShowingInstruction:boolean
  setCurrentPartIndex:(index:number)=>void
  setIsShowingInstruction:(show:boolean)=>void
}

const useTestStore=create<TestState>((set)=>({
  currentPartIndex: 0,
  isShowingInstruction: true,
  setCurrentPartIndex: (index: number) => set({ currentPartIndex: index }),
  setIsShowingInstruction: (show: boolean) => set({ isShowingInstruction: show }),
}))


export {useAudioLoadingStore,useTestStore}