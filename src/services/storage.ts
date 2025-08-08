// Storage service for managing local data persistence

import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Goal, Progress, UserPreferences } from '../types';
import { STORAGE_KEYS } from '../constants';

/**
 * Storage service class for managing app data
 */
class StorageService {
  /**
   * Save user data to local storage
   */
  async saveUserData(user: User): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  }

  /**
   * Get user data from local storage
   */
  async getUserData(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  /**
   * Save goals data to local storage
   */
  async saveGoalsData(goals: Goal[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.GOALS_DATA, JSON.stringify(goals));
    } catch (error) {
      console.error('Error saving goals data:', error);
      throw error;
    }
  }

  /**
   * Get goals data from local storage
   */
  async getGoalsData(): Promise<Goal[]> {
    try {
      const goalsData = await AsyncStorage.getItem(STORAGE_KEYS.GOALS_DATA);
      return goalsData ? JSON.parse(goalsData) : [];
    } catch (error) {
      console.error('Error getting goals data:', error);
      return [];
    }
  }

  /**
   * Save progress data to local storage
   */
  async saveProgressData(progress: Progress): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PROGRESS_DATA, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress data:', error);
      throw error;
    }
  }

  /**
   * Get progress data from local storage
   */
  async getProgressData(): Promise<Progress | null> {
    try {
      const progressData = await AsyncStorage.getItem(STORAGE_KEYS.PROGRESS_DATA);
      return progressData ? JSON.parse(progressData) : null;
    } catch (error) {
      console.error('Error getting progress data:', error);
      return null;
    }
  }

  /**
   * Save app preferences to local storage
   */
  async saveAppPreferences(preferences: UserPreferences): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.APP_PREFERENCES, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving app preferences:', error);
      throw error;
    }
  }

  /**
   * Get app preferences from local storage
   */
  async getAppPreferences(): Promise<UserPreferences | null> {
    try {
      const preferencesData = await AsyncStorage.getItem(STORAGE_KEYS.APP_PREFERENCES);
      return preferencesData ? JSON.parse(preferencesData) : null;
    } catch (error) {
      console.error('Error getting app preferences:', error);
      return null;
    }
  }

  /**
   * Mark onboarding as completed
   */
  async setOnboardingCompleted(): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
    } catch (error) {
      console.error('Error setting onboarding completed:', error);
      throw error;
    }
  }

  /**
   * Check if onboarding is completed
   */
  async isOnboardingCompleted(): Promise<boolean> {
    try {
      const completed = await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
      return completed === 'true';
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return false;
    }
  }

  /**
   * Clear all app data
   */
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.GOALS_DATA,
        STORAGE_KEYS.PROGRESS_DATA,
        STORAGE_KEYS.APP_PREFERENCES,
        STORAGE_KEYS.ONBOARDING_COMPLETED,
      ]);
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw error;
    }
  }

  /**
   * Get storage usage info
   */
  async getStorageInfo(): Promise<{ used: number; total: number }> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const data = await AsyncStorage.multiGet(keys);
      const used = data.reduce((acc, [key, value]) => {
        return acc + (value ? value.length : 0);
      }, 0);
      
      return { used, total: 50 * 1024 * 1024 }; // Assume 50MB limit
    } catch (error) {
      console.error('Error getting storage info:', error);
      return { used: 0, total: 0 };
    }
  }
}

export default new StorageService();
