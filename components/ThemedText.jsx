// import { Text, useColorScheme } from 'react-native'
// import { Colors } from '../constants/Colors';

// const ThemedText = ({ style, title =false, ...props }) => {
//   const colorScheme = useColorScheme()
//   const theme = Colors[colorScheme] ?? Colors.light
//   const textColor = title ? theme.title : theme.text

//   return (
//     <Text 
//     style={[{ color: textColor }, style]}
//      {...props} />
//   )
// }

// export default ThemedText


import { Text, useColorScheme } from 'react-native'
import { Colors } from '../constants/Colors'
import { useTheme } from '../contexts/ThemeContext'

const ThemedText = ({ style, title = false, ...props }) => {
  const systemColorScheme = useColorScheme()
  
  // Try to use theme context, fallback to system theme if context not available
  let theme
  try {
    const { colors, loading } = useTheme()
    // If theme context is loading, use system theme as fallback
    theme = loading ? Colors[systemColorScheme] ?? Colors.light : colors
  } catch (error) {
    // If theme context is not available, use system theme
    theme = Colors[systemColorScheme] ?? Colors.light
  }
  
  const textColor = title ? theme.title : theme.text
  
  return (
    <Text 
      style={[{ color: textColor }, style]}
      {...props} 
    />
  )
}

export default ThemedText