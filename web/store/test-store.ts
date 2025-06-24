import { create } from 'zustand/react'

interface TestState {
  currentPartIndex: number
  isShowingInstruction: boolean
  setCurrentPartIndex: (index: number) => void
  setIsShowingInstruction: (show: boolean) => void
  goToNextPart: () => void
}

const useTestStore = create<TestState>((set, get) => ({
  currentPartIndex: 0,
  isShowingInstruction: true,
  setCurrentPartIndex: (index) => set({ currentPartIndex: index }),
  setIsShowingInstruction: (show) => set({ isShowingInstruction: show }),
  goToNextPart: () => {
    const { currentPartIndex } = get()
    set({
      currentPartIndex: currentPartIndex + 1,
      isShowingInstruction: true,
    })
  },
}))

interface QuestionState {
  currentQuestionIndex: number
  setCurrentQuestionIndex: (index: number) => void
  currentAudioTime: number
  setCurrentAudioTime: (time: number) => void
}

const useQuestionStore = create<QuestionState>((set) => ({
  currentQuestionIndex: 0,
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  currentAudioTime: 0,
  setCurrentAudioTime: (time) => set({ currentAudioTime: time }),
}))
export { useTestStore, useQuestionStore }
