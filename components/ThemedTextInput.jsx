// import { TextInput, useColorScheme } from 'react-native'
// import { Colors } from '../constants/Colors'

// export default function ThemedTextInput({ style, ...props }) {
//   const colorScheme = useColorScheme()
//   const theme = Colors[colorScheme] ?? Colors.light

//   return (
//     <TextInput 
//       style={[
//         {
//           backgroundColor: theme.uiBackground, 
//           color: theme.text,
//           padding: 20,
//           borderRadius: 6,
//         }, 
//         style
//       ]}
//       {...props}
//     />
//   )
// }



import { useColorScheme, TextInput } from 'react-native'
import { Colors } from '../constants/Colors'
import { useTheme } from '../contexts/ThemeContext'

const ThemedTextInput = ({ style, placeholderTextColor, ...props }) => {
  const systemColorScheme = useColorScheme()
  
  let theme
  try {
    const { colors, loading } = useTheme()
    theme = loading ? Colors[systemColorScheme] ?? Colors.light : colors
  } catch (error) {
    theme = Colors[systemColorScheme] ?? Colors.light
  }
  
  return (
    <TextInput 
      style={[
        { 
          backgroundColor: theme.uiBackground,
          color: theme.text,
          borderWidth: 1,
          borderColor: theme.iconColor + '30',
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 10,
        }, 
        style
      ]}
      placeholderTextColor={placeholderTextColor || theme.iconColor}
      {...props}
    />
  )
}

export default ThemedTextInput