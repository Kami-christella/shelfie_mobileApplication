import {Stack} from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function AuthLayout() {
  return (
    <>
      <StatusBar value="auto" />
      <Stack
        screenOptions={{
            animation: 'fade_from_bottom',
           // Hide the header for auth screens
        }}
      >
        {/* Auth Screens */}
        {/* <Stack.Screen name="login" />
        <Stack.Screen name="register" /> */}
      </Stack>
    </>
  );
}