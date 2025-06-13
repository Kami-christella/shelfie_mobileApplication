// import { useColorScheme, View } from 'react-native'
// import { Colors } from '../constants/Colors'
// import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
// import { use } from 'react'

// const ThemedView = ({ style, safe =false, ...props }) => {
//   const colorScheme = useColorScheme()
//   const theme = Colors[colorScheme] ?? Colors.light

  
//   if(!safe) 
//   return (
//     <View 
//       style={[{ backgroundColor: theme.background }, style]}
//       {...props}
//     />
//   )
// const insets=useSafeAreaInsets()

//   return(
//     <View
//       style={[{ backgroundColor: theme.background,
//         paddingTop: insets.top,
//         paddingBottom: insets.bottom,
//       },
//       style]}
//       {...props}
//     />
//   )
// }

// export default ThemedView


import { useColorScheme, View } from 'react-native'
import { Colors } from '../constants/Colors'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../contexts/ThemeContext'

const ThemedView = ({ style, safe = false, ...props }) => {
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
  
  if (!safe) {
    return (
      <View 
        style={[{ backgroundColor: theme.background }, style]}
        {...props}
      />
    )
  }

  const insets = useSafeAreaInsets()
  return (
    <View
      style={[
        { 
          backgroundColor: theme.background,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        },
        style
      ]}
      {...props}
    />
  )
}

export default ThemedView