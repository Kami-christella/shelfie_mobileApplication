import { StyleSheet, Text, View, Image } from "react-native";
import Logo from '../assets/img/1.png'; // Adjust the path as necessary
 import {Link} from 'expo-router';
const Home =()=>{
    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.img} />
        <Text style={styles.title}>The Number 1</Text>
        <Text style={{marginTop: 10, marginBottom: 30, color:'red'}}>
            Reading List App
        </Text>
        <Link href="/about">Go to About Us</Link>
        </View>
    );
}
export default Home;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        fontWeight: 'bold',
        fontSize: 20,
    },
    img:{
        marginVertical: 20,
        boxShadow:'4px 4px',
      width: 100,
      height: 100
    }
});
