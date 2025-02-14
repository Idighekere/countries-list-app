import { ThemeColors, ThemeType } from '@/types/theme'

const tintColorLight = '#f2f4f7'
const tintColorDark = '#98A2B333'

export const Colors: Record<ThemeType, ThemeColors> = {
  light: {
    text: '#111',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight
  },
  dark: {
    text: '#ECEDEE',
    background: '#000F24',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark
  }
}
