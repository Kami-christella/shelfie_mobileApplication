import {  Stack } from "expo-router";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import {Colors} from '../constants/Colors'; // Adjust the path as necessary

const RootLayout=()=>{
    const colorScheme= useColorScheme();
    const theme = Colors[colorScheme] ?? Colors.light; // Fallback to light theme if colorScheme is undefined

return(

   <Stack screenOptions={{
     headerStyle: {
       backgroundColor: theme.navBackground,
       headerTintColor: theme.title,
     },
   }}>
  <Stack.Screen name="index" options={{title:"Home"}}/>
  <Stack.Screen name="about" options={{title:"About Us"}}/>
  <Stack.Screen name="contact" options={{title:"Contact Us"}}/>
   </Stack>

)
}
export default RootLayout;

const styles=StyleSheet.create({});