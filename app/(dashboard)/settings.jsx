// app/(dashboard)/settings.jsx
import { StyleSheet, ScrollView, Switch, Alert, Linking } from 'react-native'
import { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTheme } from '../../contexts/ThemeContext'
import { useUser } from '../../hooks/useUser'
import { Colors } from '../../constants/Colors'

// Icons (you can replace with your preferred icon library)
import { Ionicons } from '@expo/vector-icons'

// Themed components
import ThemedView from "../../components/ThemedView"
import ThemedText from "../../components/ThemedText"
import ThemedCard from "../../components/ThemedCard"
import ThemedButton from "../../components/ThemedButton"
import Spacer from '../../components/Spacer'

const Settings = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme()
  const { user, logout } = useUser()
  const router = useRouter()
  
  const [notifications, setNotifications] = useState(true)
  const [autoBackup, setAutoBackup] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const savedNotifications = await AsyncStorage.getItem('notifications')
      const savedAutoBackup = await AsyncStorage.getItem('autoBackup')
      const savedAnalytics = await AsyncStorage.getItem('analytics')
      
      if (savedNotifications !== null) setNotifications(JSON.parse(savedNotifications))
      if (savedAutoBackup !== null) setAutoBackup(JSON.parse(savedAutoBackup))
      if (savedAnalytics !== null) setAnalytics(JSON.parse(savedAnalytics))
    } catch (error) {
      console.log('Error loading settings:', error)
    }
  }

  const saveSetting = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log(`Error saving ${key}:`, error)
    }
  }

  const handleNotificationToggle = (value) => {
    setNotifications(value)
    saveSetting('notifications', value)
  }

  const handleAutoBackupToggle = (value) => {
    setAutoBackup(value)
    saveSetting('autoBackup', value)
  }

  const handleAnalyticsToggle = (value) => {
    setAnalytics(value)
    saveSetting('analytics', value)
  }

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            setLoading(true)
            try {
              await logout()
              router.replace('/login')
            } catch (error) {
              console.log('Logout error:', error)
            } finally {
              setLoading(false)
            }
          }
        }
      ]
    )
  }

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'This will clear all cached data. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              // Clear specific cache keys (preserve important settings)
              const keysToKeep = ['theme', 'notifications', 'autoBackup', 'analytics']
              const allKeys = await AsyncStorage.getAllKeys()
              const keysToRemove = allKeys.filter(key => !keysToKeep.includes(key))
              
              if (keysToRemove.length > 0) {
                await AsyncStorage.multiRemove(keysToRemove)
                Alert.alert('Success', 'Cache cleared successfully')
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to clear cache')
            }
          }
        }
      ]
    )
  }

  const handleRateApp = () => {
    // Replace with your app store URL
    const url = 'https://apps.apple.com/app/your-app-id'
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open app store')
    })
  }

  const handleContactSupport = () => {
    const email = 'support@yourapp.com'
    const subject = 'Support Request'
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`
    
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open email client')
    })
  }

  const SettingItem = ({ icon, title, subtitle, rightComponent, onPress }) => (
    <ThemedCard style={styles.settingCard}>
      <ThemedView style={styles.settingItem}>
        <ThemedView style={styles.settingLeft}>
          <Ionicons 
            name={icon} 
            size={24} 
            color={colors.iconColor} 
            style={styles.settingIcon}
          />
          <ThemedView style={styles.settingContent}>
            <ThemedText style={styles.settingTitle}>{title}</ThemedText>
            {subtitle && (
              <ThemedText style={styles.settingSubtitle}>{subtitle}</ThemedText>
            )}
          </ThemedView>
        </ThemedView>
        {rightComponent && (
          <ThemedView style={styles.settingRight}>
            {rightComponent}
          </ThemedView>
        )}
      </ThemedView>
    </ThemedCard>
  )

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedView style={styles.content}>
        
        <ThemedText title={true} style={styles.heading}>
          Settings
        </ThemedText>
        <Spacer />

        {/* User Info Section */}
        {user && (
          <>
            <ThemedText style={styles.sectionTitle}>Account</ThemedText>
            <SettingItem
              icon="person-circle-outline"
              title={user.name || user.email}
              subtitle={user.email}
            />
            <Spacer />
          </>
        )}

        {/* Appearance Section */}
        <ThemedText style={styles.sectionTitle}>Appearance</ThemedText>
        <SettingItem
          icon={isDarkMode ? "moon" : "sunny"}
          title="Dark Mode"
          subtitle={isDarkMode ? "Dark theme enabled" : "Light theme enabled"}
          rightComponent={
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.uiBackground, true: Colors.primary }}
              thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
            />
          }
        />
        <Spacer />

        {/* Preferences Section */}
        <ThemedText style={styles.sectionTitle}>Preferences</ThemedText>
        
        <SettingItem
          icon="notifications-outline"
          title="Push Notifications"
          subtitle="Receive notifications about new books and updates"
          rightComponent={
            <Switch
              value={notifications}
              onValueChange={handleNotificationToggle}
              trackColor={{ false: colors.uiBackground, true: Colors.primary }}
              thumbColor={notifications ? '#fff' : '#f4f3f4'}
            />
          }
        />

        <SettingItem
          icon="cloud-upload-outline"
          title="Auto Backup"
          subtitle="Automatically backup your books to cloud"
          rightComponent={
            <Switch
              value={autoBackup}
              onValueChange={handleAutoBackupToggle}
              trackColor={{ false: colors.uiBackground, true: Colors.primary }}
              thumbColor={autoBackup ? '#fff' : '#f4f3f4'}
            />
          }
        />

        <SettingItem
          icon="analytics-outline"
          title="Analytics"
          subtitle="Help improve the app by sharing usage data"
          rightComponent={
            <Switch
              value={analytics}
              onValueChange={handleAnalyticsToggle}
              trackColor={{ false: colors.uiBackground, true: Colors.primary }}
              thumbColor={analytics ? '#fff' : '#f4f3f4'}
            />
          }
        />
        <Spacer />

        {/* Support Section */}
        <ThemedText style={styles.sectionTitle}>Support</ThemedText>
        
        <SettingItem
          icon="star-outline"
          title="Rate App"
          subtitle="Love the app? Leave us a review"
          rightComponent={
            <Ionicons name="chevron-forward" size={20} color={colors.iconColor} />
          }
          onPress={handleRateApp}
        />

        <SettingItem
          icon="mail-outline"
          title="Contact Support"
          subtitle="Get help with any issues"
          rightComponent={
            <Ionicons name="chevron-forward" size={20} color={colors.iconColor} />
          }
          onPress={handleContactSupport}
        />

        <SettingItem
          icon="information-circle-outline"
          title="About"
          subtitle="App version and information"
          rightComponent={
            <Ionicons name="chevron-forward" size={20} color={colors.iconColor} />
          }
          onPress={() => router.push('/about')}
        />
        <Spacer />

        {/* Data Section */}
        <ThemedText style={styles.sectionTitle}>Data</ThemedText>
        
        <SettingItem
          icon="trash-outline"
          title="Clear Cache"
          subtitle="Free up storage space"
          rightComponent={
            <Ionicons name="chevron-forward" size={20} color={colors.iconColor} />
          }
          onPress={handleClearCache}
        />
        <Spacer />

        {/* Logout Button */}
        <ThemedButton 
          style={[styles.logoutButton, { backgroundColor: Colors.warning }]}
          onPress={handleLogout}
          disabled={loading}
        >
          <ThemedText style={styles.logoutText}>
            {loading ? 'Logging out...' : 'Logout'}
          </ThemedText>
        </ThemedButton>

        <Spacer size={50} />
      </ThemedView>
    </ScrollView>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingCard: {
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: 15,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  settingSubtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  },
  settingRight: {
    marginLeft: 10,
  },
  logoutButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})