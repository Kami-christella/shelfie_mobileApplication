// import { Image, useColorScheme } from 'react-native'

// // images
// // import DarkLogo from '../assets/img/logo_dark.png'
// // import LightLogo from '../assets/img/logo_light.png'
// import DarkLogo from '../assets/img/libra2.jpg'

// const ThemedLogo = (...props) => {
//   const colorScheme = useColorScheme()
  
//   const logo = colorScheme === 'dark' ? DarkLogo : LightLogo

//   return (
//     <Image source={logo}{...props}/>
//   )
// }

// export default ThemedLogo

import { Image, useColorScheme } from 'react-native'

// images
import DarkLogo from '../assets/img/libra1.jpg'
// import LightLogo from '../assets/img/logo_light.png' // Add this when you have a light version

const ThemedLogo = ({ style, width = 500, height = 300, ...props }) => {
  const colorScheme = useColorScheme()
  
  // Use the same logo for both themes since you only have one
  // const logo = colorScheme === 'dark' ? DarkLogo : LightLogo
  const logo = DarkLogo

  return (
    <Image 
      source={logo} 
      style={[
        {
          width: width,
          height: height,
          marginTop:-70,
          resizeMode: 'contain', // or 'cover', 'stretch', 'center'
        },
        style
      ]}
      {...props}
    />
  )
}

export default ThemedLogo