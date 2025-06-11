import {Stack} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import GuestOnly from '../../components/auth/GuestOnly';

export default function AuthLayout() {
  return (
    <GuestOnly>
      <StatusBar value="auto" />
      <Stack
        screenOptions={{
            animation: 'fade_from_bottom',
        }}
      >
        {/* Auth Screens */}
        {/* <Stack.Screen name="login" />
        <Stack.Screen name="register" /> */}
      </Stack>
    </GuestOnly>
  );
}