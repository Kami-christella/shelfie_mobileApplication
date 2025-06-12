import { Image, StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import ThemedView from '../components/ThemedView';
import ThemedLogo from '../components/ThemedLogo';
import ThemedText from '../components/ThemedText';
import Spacer from '../components/Spacer';
import { Ionicons } from '@expo/vector-icons';
import Profile from './(dashboard)/profile';

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedLogo/>
     
      <Spacer height={10}/>
      <Text style={{marginLeft:10, color: '#fff'}}> Our library is a modern, user-friendly space designed to provide
         easy access to a wide range of academic resources, digital books, and research tools for all 
         learners. 
         </Text> 
       
      <Spacer/>


     <View style={styles.buttonContainer}>
  <Link href="/login" style={styles.loginbtn}>
  
    <ThemedText>Login Page</ThemedText>
  </Link>

  <Link href="/register" style={styles.registerbtn}>
    <ThemedText>Register Page</ThemedText>
  </Link>
</View>

       {/* <Link href="/profile" style={styles.link}>
        <ThemedText>Profile Page</ThemedText>
      </Link> */}

    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1
  },
  buttonContainer: {
  flexDirection: 'row',     
  justifyContent: 'space-between', 
  paddingHorizontal: 20
},

loginbtn: {
  backgroundColor: '#1e40af',
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 6,
  borderBottomWidth: 1,
  borderColor: '#374151',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 3,
  marginRight: 10,         // Space between buttons
},

registerbtn: {
  backgroundColor: '#7e3bca',
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 6,
  borderBottomWidth: 1,
  borderColor: '#7e3bca',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 3,
}

})


