// Profile screen with user information and settings

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants';
import { User } from '../types';

interface ProfileScreenProps {
  navigation: any;
  route: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    // In a real app, this would load from storage/API
    setUser({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: undefined,
      dateOfBirth: '1990-05-15',
      interests: ['Technology', 'Sports', 'Reading'],
      currentGoals: [],
      completedGoals: [],
      progress: {
        totalGoals: 8,
        completedGoals: 3,
        currentStreak: 12,
        longestStreak: 25,
        totalHoursSpent: 156,
        weeklyProgress: [],
      },
      preferences: {
        theme: 'light',
        notifications: true,
        reminderTime: '09:00',
        language: 'en',
        privacyLevel: 'private',
      },
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
    });
  };

  const renderHeader = () => (
    <LinearGradient
      colors={[COLORS.primary, COLORS.primaryDark]}
      style={styles.header}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color="#FFFFFF" />
        </View>
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>
    </LinearGradient>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{user?.progress.totalGoals || 0}</Text>
        <Text style={styles.statLabel}>Total Goals</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{user?.progress.completedGoals || 0}</Text>
        <Text style={styles.statLabel}>Completed</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statNumber}>{user?.progress.currentStreak || 0}</Text>
        <Text style={styles.statLabel}>Day Streak</Text>
      </View>
    </View>
  );

  const renderMenuSection = (title: string, items: any[]) => (
    <View style={styles.menuSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item, index) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.menuItem,
            index === items.length - 1 && styles.menuItemLast
          ]}
          onPress={item.onPress}
        >
          <View style={styles.menuItemLeft}>
            <Ionicons name={item.icon} size={24} color={item.iconColor || COLORS.text} />
            <Text style={styles.menuItemText}>{item.title}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
      ))}
    </View>
  );

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    Alert.alert('Edit Profile', 'This feature will be implemented soon!');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  const handleHelp = () => {
    Alert.alert('Help & Support', 'Contact us at support@lifepathguide.com');
  };

  const handleAbout = () => {
    Alert.alert(
      'About LifePathGuide',
      'Version 1.0.0\n\nYour personal development companion that helps you discover your path, set meaningful goals, and track your progress towards becoming the best version of yourself.'
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            // In a real app, this would clear user data and navigate to onboarding
            Alert.alert('Logged out', 'You have been successfully logged out.');
          }
        },
      ]
    );
  };

  const accountItems = [
    {
      id: 'edit',
      title: 'Edit Profile',
      icon: 'person-outline',
      onPress: handleEditProfile,
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings-outline',
      onPress: handleSettings,
    },
  ];

  const supportItems = [
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: handleHelp,
    },
    {
      id: 'about',
      title: 'About',
      icon: 'information-circle-outline',
      onPress: handleAbout,
    },
  ];

  const actionItems = [
    {
      id: 'logout',
      title: 'Logout',
      icon: 'log-out-outline',
      iconColor: COLORS.error,
      onPress: handleLogout,
    },
  ];

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderStats()}
        {renderMenuSection('Account', accountItems)}
        {renderMenuSection('Support', supportItems)}
        {renderMenuSection('Actions', actionItems)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 12,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  menuSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 15,
  },
});

export default ProfileScreen;
