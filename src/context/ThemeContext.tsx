import {
  useEffect,
  useState,
  useContext,
  createContext,
  ReactNode
} from 'react'
import { ThemeContextProps, ThemeType } from '@/types/theme'
import { useColorScheme } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Colors } from '@/constants/Colors'

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme() as ThemeType

  const [theme, setTheme] = useState<ThemeType>('light')

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme')

        if (storedTheme) {
          setTheme(storedTheme as ThemeType)
        } else {
          setTheme(systemColorScheme || 'light')
        }
      } catch (error) {
        console.error('Failed to load theme from Async Storage', error)
      }
    }
    loadTheme()
  }, [])

  const toggleTheme = async () => {
    const newTheme = theme == 'dark' ? 'light' : 'dark'

    setTheme(newTheme)

    try {
      await AsyncStorage.setItem('theme', newTheme)
    } catch (error) {
      console.error('Failed to save theme in Async Storage', error)
    }
  }

  return (
    <ThemeContext.Provider
      value={{ theme, colors: Colors[theme], toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext)

  if (!context) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
