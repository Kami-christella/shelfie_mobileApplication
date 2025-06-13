// import { Pressable, StyleSheet } from "react-native";
// import {Colors} from "../constants/Colors";

// const ThemedButton = ({ style, ...props})=>{
//   return (
//     <Pressable
//       style={({ pressed }) => [
//         styles.btn,
//         pressed && styles.pressed,
//         style
//       ]}
//       {...props}
//     />
      
//   );
// };

// const styles = StyleSheet.create({
//   btn: {
//     backgroundColor: Colors.primary,
//     padding: 18,
//     borderRadius: 6,
//     marginVertical: 10,
//   },
//   pressed: {
//     opacity: 0.8,
//   },
// });

// export default ThemedButton;


// ThemedButton.jsx
import { useColorScheme, TouchableOpacity } from 'react-native'
import { Colors } from '../constants/Colors'
import { useTheme } from '../contexts/ThemeContext'

const ThemedButton = ({ style, disabled, ...props }) => {
  const systemColorScheme = useColorScheme()
  
  let theme
  try {
    const { colors, loading } = useTheme()
    theme = loading ? Colors[systemColorScheme] ?? Colors.light : colors
  } catch (error) {
    theme = Colors[systemColorScheme] ?? Colors.light
  }
  
  return (
    <TouchableOpacity 
      style={[
        { 
          backgroundColor: disabled ? theme.iconColor : Colors.primary,
          borderRadius: 8,
          paddingHorizontal: 20,
          paddingVertical: 12,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
        }, 
        style
      ]}
      disabled={disabled}
      {...props}
    />
  )
}

export default ThemedButton