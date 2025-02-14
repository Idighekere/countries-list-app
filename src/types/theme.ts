export type ThemeType = 'light' | 'dark'

export interface ThemeColors {
  text: string
  background: string
  tint: string
  icon: string
  tabIconDefault: string
  tabIconSelected: string
}

export interface ThemeContextProps {
  theme: ThemeType
  colors: ThemeColors
  toggleTheme: () => void
}
