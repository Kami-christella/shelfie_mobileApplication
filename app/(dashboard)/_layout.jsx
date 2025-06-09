import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const DashboardLayout = ({  }) => {
    const colorScheme = useColorScheme();
    const theme=Colors[colorScheme] ?? Colors.light;
  return (
   <Tabs
     screenOptions={{
       headerShown: false, 
       tabBarStyle:{ 
        backgroundColor: theme.navBackground,
        paddingTop: 10,
        height: 90,
        },
         tabBarActiveTintColor: theme.iconColorFocused,
         tabBarInactiveTintColor: theme.iconColor,
     }}
   >
        <Tabs.Screen
         name="create" options={{ title: "Create" }} 
         />
    <Tabs.Screen 
    name="books" options={{ title: "Books" }}
     />
    <Tabs.Screen 
    name="profile" options={{ title: "Profile", tabBarIcon:()=>(
        <Ionicons/>
    ) }} 
    />
    </Tabs>

  );
}

export default DashboardLayout;