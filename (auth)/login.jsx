import { StyleSheet } from "react-native";
import ThemedText from "../components/ThemedText";
import ThemedView from "../components/ThemedView";
import Spacer from "../components/Spacer";
import { Link } from "expo-router";

const login =()=>{
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

export default login;

const styles = StyleSheet.create({})