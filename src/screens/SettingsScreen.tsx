// Settings screen with app preferences

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { UserPreferences } from '../types';

interface SettingsScreenProps {
  navigation: any;
  route: any;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    notifications: true,
    reminderTime: '09:00',
    language: 'en',
    privacyLevel: 'private',
  });

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = () => {
    // In a real app, this would load from storage
    // For now, using default values
  };

  const updatePreference = (key: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleExportData = () => {
    Alert.alert('Export Data', 'Your data will be exported as a JSON file.');
  };

  const handleImportData = () => {
    Alert.alert('Import Data', 'Select a JSON file to import your data.');
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will permanently delete all your goals, progress, and settings. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear Data', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Data Cleared', 'All data has been cleared successfully.');
          }
        },
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Settings</Text>
      <View style={{ width: 24 }} />
    </View>
  );

  const renderSection = (title: string, children: React.ReactNode) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const renderSettingItem = (
    icon: string,
    title: string,
    subtitle?: string,
    rightComponent?: React.ReactNode,
    onPress?: () => void
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingItemLeft}>
        <Ionicons name={icon as any} size={24} color={COLORS.text} />
        <View style={styles.settingItemContent}>
          <Text style={styles.settingItemTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingItemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent}
    </TouchableOpacity>
  );

  const renderAppearance = () => (
    renderSection('Appearance', (
      <>
        {renderSettingItem(
          'moon',
          'Theme',
          'Choose your preferred theme',
          <View style={styles.themeSelector}>
            {['light', 'dark', 'auto'].map((theme) => (
              <TouchableOpacity
                key={theme}
                style={[
                  styles.themeOption,
                  preferences.theme === theme && styles.themeOptionSelected
                ]}
                onPress={() => updatePreference('theme', theme)}
              >
                <Text style={[
                  styles.themeOptionText,
                  preferences.theme === theme && styles.themeOptionTextSelected
                ]}>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </>
    ))
  );

  const renderNotifications = () => (
    renderSection('Notifications', (
      <>
        {renderSettingItem(
          'notifications',
          'Push Notifications',
          'Receive reminders and updates',
          <Switch
            value={preferences.notifications}
            onValueChange={(value) => updatePreference('notifications', value)}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
            thumbColor="#FFFFFF"
          />
        )}
        
        {preferences.notifications && renderSettingItem(
          'time',
          'Reminder Time',
          `Daily reminders at ${preferences.reminderTime}`,
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />,
          () => Alert.alert('Reminder Time', 'This feature will be implemented soon!')
        )}
      </>
    ))
  );

  const renderPrivacy = () => (
    renderSection('Privacy & Security', (
      <>
        {renderSettingItem(
          'lock-closed',
          'Privacy Level',
          'Control who can see your goals',
          <View style={styles.privacySelector}>
            {['public', 'private', 'friends'].map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.privacyOption,
                  preferences.privacyLevel === level && styles.privacyOptionSelected
                ]}
                onPress={() => updatePreference('privacyLevel', level)}
              >
                <Text style={[
                  styles.privacyOptionText,
                  preferences.privacyLevel === level && styles.privacyOptionTextSelected
                ]}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </>
    ))
  );

  const renderData = () => (
    renderSection('Data Management', (
      <>
        {renderSettingItem(
          'download',
          'Export Data',
          'Download your data as JSON',
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />,
          handleExportData
        )}
        
        {renderSettingItem(
          'upload',
          'Import Data',
          'Import data from JSON file',
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />,
          handleImportData
        )}
        
        {renderSettingItem(
          'trash',
          'Clear All Data',
          'Permanently delete all data',
          <Ionicons name="chevron-forward" size={20} color={COLORS.error} />,
          handleClearData
        )}
      </>
    ))
  );

  const renderAbout = () => (
    renderSection('About', (
      <>
        {renderSettingItem(
          'information-circle',
          'Version',
          '1.0.0',
          null
        )}
        
        {renderSettingItem(
          'document-text',
          'Terms of Service',
          'Read our terms and conditions',
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />,
          () => Alert.alert('Terms of Service', 'This feature will be implemented soon!')
        )}
        
        {renderSettingItem(
          'shield-checkmark',
          'Privacy Policy',
          'Read our privacy policy',
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />,
          () => Alert.alert('Privacy Policy', 'This feature will be implemented soon!')
        )}
      </>
    ))
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderAppearance()}
        {renderNotifications()}
        {renderPrivacy()}
        {renderData()}
        {renderAbout()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingItemContent: {
    marginLeft: 15,
    flex: 1,
  },
  settingItemTitle: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 2,
  },
  settingItemSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  themeSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  themeOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#FFFFFF',
  },
  themeOptionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  themeOptionText: {
    fontSize: 12,
    color: COLORS.text,
  },
  themeOptionTextSelected: {
    color: '#FFFFFF',
  },
  privacySelector: {
    flexDirection: 'row',
    gap: 8,
  },
  privacyOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#FFFFFF',
  },
  privacyOptionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  privacyOptionText: {
    fontSize: 12,
    color: COLORS.text,
  },
  privacyOptionTextSelected: {
    color: '#FFFFFF',
  },
});

export default SettingsScreen;
