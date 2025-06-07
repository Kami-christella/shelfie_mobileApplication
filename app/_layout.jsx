import {  Stack } from "expo-router";
import { StyleSheet, Text, useColorScheme, View } from "react-native";

const RootLayout=()=>{
    const colorSchema= useColorScheme();
    console.log(colorSchema); 
    
return(

   <Stack screenOptions={{
     headerStyle: {
       backgroundColor: '#ddd',
       headerTintColor: '#333',
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