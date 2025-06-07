import { StyleSheet } from "react-native";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import Spacer from "../../components/Spacer";
import { Link } from "expo-router";

const Login =()=>{
    return (
        <ThemedView style={styles.container}>
            <Spacer/>
            <ThemedText title={true} style={styles.title}>
                Login To Your Account
             </ThemedText>
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
    }
})