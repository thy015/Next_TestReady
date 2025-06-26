import { create } from 'zustand/react'

interface TestState {
  currentPartIndex: number
  isShowingInstruction: boolean
  setIsShowingInstruction: (show: boolean) => void
  isUserClickedNextInstruction: boolean
  setIsUserClickedNextInstruction: (clicked: boolean) => void
}

const useTestStore = create<TestState>((set) => ({
  currentPartIndex: 0,
  isShowingInstruction: true,
  setIsShowingInstruction: (show) => set({ isShowingInstruction: show }),
  isUserClickedNextInstruction: false,
  setIsUserClickedNextInstruction: (clicked) =>
    set({ isUserClickedNextInstruction: clicked }),
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
