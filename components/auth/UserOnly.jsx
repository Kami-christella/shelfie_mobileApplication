// import { useRouter } from "expo-router";
// import { useEffect } from "react";
// import { useUser } from "../../hooks/useUser";
// import { Text } from "react-native";

// const UserOnly = ({ children }) => {
//   const { user, authChecked } = useUser()
//   const router = useRouter()

//   console.log('UserOnly Debug:')
//   console.log('- authChecked:', authChecked)
//   console.log('- user:', user)

//   useEffect(() => {
//     // Handle undefined authChecked - treat as "not checked yet"
//     if (authChecked === true && (user === null || (user && user.email === null))) {
//       console.log('Redirecting to login...')
//       router.replace('/login')
//     }
//   }, [user, authChecked])

//   // Show loading if authChecked is undefined or false
//   if (authChecked !== true) {
//     console.log('Showing loading because authChecked is:', authChecked)
//     return <Text>Loading</Text>
//   }

//   return children
// }

// export default UserOnly

// //second

// import { useRouter } from "expo-router";
// import {  useEffect } from "react";
// import { useUser } from "../../hooks/useUser";
// import { Text } from "react-native";

// const UserOnly=({children})=>{
// const {user, authChecked} = useUser()
// const router = useRouter()

//  useEffect(() => {
//    if(authChecked && user ===null || user.email===null){
//     router.replace('/login')
//    } else{
//      return children
//    }
//  },[user, authChecked])

// //  if(!authChecked || !user){
// //     return(
// //         <Text>Loading</Text>
// //     )
// //  }
//   return children
// }

// export default UserOnly
// //on lesson 19


import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { Text } from "react-native";

const UserOnly = ({ children }) => {
  const { user, authChecked } = useUser()
  const router = useRouter()

  console.log('UserOnly Debug:')
  console.log('- authChecked:', authChecked)
  console.log('- user:', user)

  useEffect(() => {
    console.log('useEffect running - authChecked:', authChecked, 'user:', user)
    
    // ✅ SIMPLIFIED CONDITION - if auth is checked and no user, redirect
    if (authChecked && !user) {
      console.log('🔄 Redirecting to login - no user found')
      router.replace('/login')
      return // Exit early
    }
  }, [user, authChecked, router])

  // ✅ IMPORTANT: Don't render anything if user should be redirected
  if (authChecked && !user) {
    console.log('⏳ Should be redirecting...')
    return <Text>Redirecting to login...</Text>
  }

  // Show loading while checking
  if (!authChecked) {
    return <Text>Loading...</Text>
  }

  // Only render children if we have a user
  if (user) {
    return children
  }

  // Fallback
  return <Text>Loading user data...</Text>
}

export default UserOnly