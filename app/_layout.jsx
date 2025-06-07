import {  Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const RootLayout=()=>{
return(

   <Stack screenOptions={{
     headerStyle: {
       backgroundColor: '#ddd',
       headerTintColor: '#333',
     },
   }}>
  <Stack.Screen name="index" options={{title:"Home"}}/>
  <Stack.Screen name="about" options={{title:"About Us"}}/>
  <Stack.Screen name="contact" options={{title:"Contact Us", headerShown: false}}/>
   </Stack>

)
}
export default RootLayout;

const styles=StyleSheet.create({});