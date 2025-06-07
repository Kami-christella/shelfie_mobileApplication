import {  Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const RootLayout=()=>{
return(
    <View style={{flex:1}}>
        <Stack />
        <Text>Footer</Text>
    </View>
)
}
export default RootLayout;

const styles=StyleSheet.create({});