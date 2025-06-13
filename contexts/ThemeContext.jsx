// contexts/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Colors } from '../constants/Colors'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true) // default to dark
  const [loading, setLoading] = useState(true)

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference()
  }, [])

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme')
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark')
      }
    } catch (error) {
      console.log('Error loading theme preference:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode
      setIsDarkMode(newTheme)
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light')
    } catch (error) {
      console.log('Error saving theme preference:', error)
    }
  }

  const setTheme = async (isDark) => {
    try {
      setIsDarkMode(isDark)
      await AsyncStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch (error) {
      console.log('Error saving theme preference:', error)
    }
  }

  const colors = isDarkMode ? Colors.dark : Colors.light
  const theme = {
    isDarkMode,
    colors,
    toggleTheme,
    setTheme,
    loading
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}