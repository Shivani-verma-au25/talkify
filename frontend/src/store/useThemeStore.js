import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem('talkify-theme') || "light",
  setTheme : (theme) => {
    localStorage.setItem('talkify-theme',theme)
    set({ theme })
  }
}))