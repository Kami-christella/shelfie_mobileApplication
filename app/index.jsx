import { Image, StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import ThemedView from '../components/ThemedView';
import ThemedLogo from '../components/ThemedLogo';
import ThemedText from '../components/ThemedText';
import Spacer from '../components/Spacer';
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
      <Link href="/login" style={styles.loginbtn}>
        <ThemedText>Login Page</ThemedText>
      </Link>
      <Link href="/register" style={styles.link}>
        <ThemedText>Register Page</ThemedText>
      </Link>
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
  loginbtn:{
     backgroundColor: '#55be52',
  paddingVertical: 8,      
  paddingHorizontal: 16,   
  borderRadius: 6,        
  marginVertical: 8,      
  borderBottomWidth: 1,
  borderColor: '#4aa947',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },  
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 3,  
  alignSelf: 'flex-start',
  marginLeft:30          
  }
})


