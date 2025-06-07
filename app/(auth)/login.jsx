import { StyleSheet, Pressable, Text } from "react-native";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import Spacer from "../../components/Spacer";
import { Link } from "expo-router";
import {Colors} from "../../constants/Colors";

const Login =()=>{

    const handleSubmit = () => {
        // Handle login logic here
        console.log("Login button pressed");
    }
    return (
        <ThemedView style={styles.container}>

            <Spacer/>
            <ThemedText title={true} style={styles.title}>
                Login To Your Account
             </ThemedText>
             <Pressable
             onPress={handleSubmit}
              style={({pressed }) => [styles.btn, pressed && styles.pressed]}>
                 <Text style={{ color: '#f2f2f2'}}>
                     Login
                 </Text>
             </Pressable>
            <Spacer height={100}/>
            <Link href="/register">
                <ThemedText style={{textAlign: 'center'}}>
                    Register
                </ThemedText>
            </Link>
        </ThemedView>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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