import { create } from 'zustand/react'

interface TestState {
  currentPartIndex: number
  setCurrentPartIndex: (index: number) => void
  isShowingInstruction: boolean
  setIsShowingInstruction: (show: boolean) => void
  isTestCompleted: boolean
  setIsTestCompleted: (completed: boolean) => void
}

const useTestStore = create<TestState>((set) => ({
  currentPartIndex: 0,
  setCurrentPartIndex: (index) => set({ currentPartIndex: index }),
  isShowingInstruction: true,
  setIsShowingInstruction: (show) => set({ isShowingInstruction: show }),
  isTestCompleted: false,
  setIsTestCompleted: (completed) => set({ isTestCompleted: completed }),
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
