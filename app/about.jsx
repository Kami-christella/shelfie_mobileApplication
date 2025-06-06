   import { StyleSheet, Text, View } from "react-native";
   import {Link} from 'expo-router';

   const About=()=>{
    return (
        <View style={styles.container}> 
            <Text style={styles.title}>About Us Page</Text>
            <Text style={{marginTop: 10, marginBottom: 30, color:'red'}}>
                This is a Reading List App
            </Text>
            <Link href="/" styles={styles.link}>Go Back Home</Link>
        </View>

    )
   }

   export default About;
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