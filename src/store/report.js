import { atom } from 'recoil'

export const reportScrollProgressState = atom({
  key: "report-scroll-progress-state",
  default: {
    start: 0,
    end: 0,
  }
})