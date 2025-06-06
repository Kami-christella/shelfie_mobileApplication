   import { StyleSheet, Text, View } from "react-native";
   import {Link} from 'expo-router';

   const Contact=()=>{
    return (
        <View style={styles.container}> 
            <Text style={styles.title}>Contact Us Page</Text>
            <Text style={{marginTop: 10, marginBottom: 30, color:'red'}}>
                This is a Reading List App
            </Text>
                        <Link href="/about" styles={styles.link}>Go to About Page</Link>
                        
            <Link href="/contact" styles={styles.link}>Go to Contact Page</Link>

        </View>

    )
   }

   export default Contact;
   const styles =StyleSheet.create({
      container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        fontWeight: 'bold',
        fontSize: 20,
    },
    link:{
        marginVertical:10,
        borderBottomWidth: 1,
    }
   })