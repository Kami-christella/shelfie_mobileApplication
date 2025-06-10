import { StyleSheet, Pressable, Text } from "react-native";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import ThemedButton from "../../components/ThemedButton";
import ThemedTextInput from "../../components/ThemedTextInput"
import Spacer from "../../components/Spacer";
import { Link } from "expo-router";
import { useState } from 'react'
import {Colors} from "../../constants/Colors";

const Register =()=>{
     const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")

    const handleSubmit = () => {
        console.log("Register Form submitted", email, password);
    }
    return (
        <ThemedView style={styles.container}>

            <Spacer/>
            <ThemedText title={true} style={styles.title}>
                Register For An Account
             </ThemedText>

             <ThemedTextInput
                       style={{ marginBottom: 20, width: "80%" }}
                       placeholder="Email"
                       value={email}
                       onChangeText={setEmail}
                       keyboardType="email-address"
                     />
             
                     <ThemedTextInput
                       style={{ marginBottom: 20, width: "80%" }}
                       placeholder="Password"
                       value={password}
                       onChangeText={setPassword}
                       secureTextEntry
                     />

           <ThemedButton onPress={handleSubmit}>
            <Text style={{ color: '#f2f2f2'}}>Register</Text>
           </ThemedButton>

            <Spacer height={100}/>
            <Link href="/login">
                <ThemedText style={{textAlign: 'center'}}>
                    Login
                </ThemedText>
            </Link>
        </ThemedView>
    )
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 30,
    },
    link: {
        marginVertical: 10,
        borderBottomWidth: 1
    },
    btn: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 5,
    },
    pressed: {
        opacity: 0.8
    },
})