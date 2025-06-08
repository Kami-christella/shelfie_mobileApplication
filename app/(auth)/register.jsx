import { StyleSheet, Pressable, Text } from "react-native";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import ThemedButton from "../../components/ThemedButton";
import Spacer from "../../components/Spacer";
import { Link } from "expo-router";
import {Colors} from "../../constants/Colors";

const Register =()=>{

    const handleSubmit = () => {
        console.log("Register Form submitted");
    }
    return (
        <ThemedView style={styles.container}>

            <Spacer/>
            <ThemedText title={true} style={styles.title}>
                Register For An Account
             </ThemedText>

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