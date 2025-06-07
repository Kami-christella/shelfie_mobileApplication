import { Image, StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'

import Logo from '../assets/img/logo_light.png';
import ThemedView from '../components/ThemedView';
import ThemedLogo from '../components/ThemedLogo';
import ThemedText from '../components/ThemedText';
import Spacer from '../components/Spacer';

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedLogo/>
      <Spacer height={20}/>
      <ThemedText style={styles.title} title={true}>
        The Number 1
       </ThemedText>
      <Spacer height={10}/>
      <ThemedText> Reading List App </ThemedText>
      <Spacer/>
      <Link href="/about" style={styles.link}>
        <ThemedText>About Page</ThemedText>
      </Link>
      <Link href="/contact" style={styles.link}>
        <ThemedText>Contact Page</ThemedText>
      </Link>
    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#e0dfe8'
  },
//   img: {
//     marginVertical: 20,
//     boxShadow: '4px 4px',
//     width: 100,
//     height: 100
//   },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1
  }
})


