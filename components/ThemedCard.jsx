// import { StyleSheet, useColorScheme, View } from "react-native";

// import { Colors } from '../constants/Colors'

// const ThemedCard = ({ style, ...props }) => {
//   const colorScheme = useColorScheme();
//   const theme = Colors[colorScheme] ?? Colors.light;


// return (
//     <View
//      style={[{backgroundColor: theme.uiBackground}, styles.card,
//          style]}
//      {...props}
//     />
//   );
// }

// export default ThemedCard;

// const styles = StyleSheet.create({
//   card: {
//     borderRadius: 5,
//     padding: 20
//   },
// });

// ThemedCard.jsx
import { useColorScheme, View } from 'react-native'
import { Colors } from '../constants/Colors'
import { useTheme } from '../contexts/ThemeContext'

const ThemedCard = ({ style, ...props }) => {
  const systemColorScheme = useColorScheme()
  
  let theme
  try {
    const { colors, loading } = useTheme()
    theme = loading ? Colors[systemColorScheme] ?? Colors.light : colors
  } catch (error) {
    theme = Colors[systemColorScheme] ?? Colors.light
  }
  
  return (
    <View 
      style={[
        { 
          backgroundColor: theme.uiBackground,
          borderRadius: 8,
          padding: 16,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        }, 
        style
      ]}
      {...props}
    />
  )
}

export default ThemedCard