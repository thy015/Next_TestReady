import { create } from "zustand/react"

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

export { useTestStore }