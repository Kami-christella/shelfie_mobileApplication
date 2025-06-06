// import { Stack } from "expo-router"
// import { Colors } from "../constants/Colors"
// import { useColorScheme } from "react-native"
// import { StatusBar } from "expo-status-bar"

// export default function RootLayout() {
//   const colorScheme = useColorScheme()
//   const theme = Colors[colorScheme] ?? Colors.light

//   return (
//     <>
//       <StatusBar value="auto" />
//       <Stack screenOptions={{
//         headerStyle: { backgroundColor: theme.navBackground },
//         headerTintColor: theme.title,
//       }}>
//         {/* Individual Screens */}
//         <Stack.Screen name="index" options={{ title: "Home" }} />
//         <Stack.Screen name="about" options={{ title: "About" }} />
//         <Stack.Screen name="contact" options={{ title: "Contact" }} />
//       </Stack>
//     </>
//   )
// }



import { Stack } from "expo-router"
import { Colors } from "../constants/Colors"
import { useColorScheme } from "react-native"
import { StatusBar } from "expo-status-bar"

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <>
      <StatusBar value="auto" />
      <Stack screenOptions={{
        headerStyle: { backgroundColor: theme.navBackground },
        headerTintColor: theme.title,
      }}>
       <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ title: "Home" }} />

      </Stack>
    </>
  )
}