// import { StyleSheet, Text } from 'react-native'
// import { useUser } from '../../hooks/useUser'
// import Spacer from "../../components/Spacer"
// import ThemedText from "../../components/ThemedText"
// import ThemedView from "../../components/ThemedView"
// import ThemedButton from '../../components/ThemedButton'



// const Profile = () => {
//   const {logout, user} =useUser()
//     if (!user) {
//     return (
//       <ThemedView style={styles.container}>
//         <Text>Loading user data...</Text>
//       </ThemedView>
//     )
//   }
//   return (
//     <ThemedView style={styles.container}>

//       <ThemedText title={true} style={styles.heading}>
//        {/* {user.email} */}
//        {user.email || "No email available"}
//       </ThemedText>
//       <Spacer />
//       <ThemedButton onPress={logout}>
//         <Text style={{color:"#f2f2f2"}}>Logout</Text>
//       </ThemedButton>

//       <ThemedText>Time to start reading some books...</ThemedText>
//       <Spacer />

//     </ThemedView>
//   )
// }

// export default Profile

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   heading: {
//     fontWeight: "bold",
//     fontSize: 18,
//     textAlign: "center",
//   },
// })


import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useUser } from '../../hooks/useUser'
import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedButton from '../../components/ThemedButton'
import { useRouter } from 'expo-router'




const Profile = () => {
  const { logout, user } = useUser()
  const router = useRouter()

  if (!user) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ThemedText style={styles.loadingText}>Loading user data...</ThemedText>
        </View>
      </ThemedView>
    )
  }

  // Extract user initials for avatar
  const getInitials = (email) => {
    if (!email) return 'U'
    return email.charAt(0).toUpperCase()
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          {/* User Avatar */}
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{getInitials(user.email)}</Text>
          </View>
          
          {/* User Info */}
          <View style={styles.userInfo}>
            <ThemedText style={styles.welcomeText}>Welcome back!</ThemedText>
            <ThemedText style={styles.emailText}>
              {user.email || "No email available"}
            </ThemedText>
          </View>
        </View>

        <Spacer />
        <Spacer />

        {/* Main Content */}
        <View style={styles.content}>
          <View style={styles.messageContainer}>
            <ThemedText style={styles.messageText}>
              Ready to dive into your next great read?
            </ThemedText>
            <ThemedText style={styles.subMessageText}>
              Your literary journey awaits
            </ThemedText>
          </View>

          <Spacer />
          <Spacer />

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
           <ThemedButton style={styles.primaryButton} onPress={() => router.push('/books')}>
                 <Text style={styles.primaryButtonText}>Browse Books</Text>
           </ThemedButton>
            
            <Spacer />
            
            <ThemedButton style={styles.secondaryButton} onPress={logout}>
              <Text style={styles.secondaryButtonText}>Logout</Text>
            </ThemedButton>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    opacity: 0.7,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  userInfo: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  emailText: {
    fontSize: 16,
    opacity: 0.7,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
  messageContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  messageText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subMessageText: {
    fontSize: 16,
    opacity: 0.6,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 280,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  secondaryButtonText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
})