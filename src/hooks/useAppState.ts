// Custom hook for managing app state

import { useState, useEffect } from 'react';
import { AppState, User } from '../types';
import storageService from '../services/storage';

export const useAppState = () => {
  const [appState, setAppState] = useState<AppState>({
    user: null,
    isOnboardingCompleted: false,
    isLoading: true,
    error: null,
    currentScreen: 'Onboarding',
  });

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setAppState(prev => ({ ...prev, isLoading: true }));

      // Check if onboarding is completed
      const isOnboardingCompleted = await storageService.isOnboardingCompleted();
      
      if (isOnboardingCompleted) {
        // Load user data
        const userData = await storageService.getUserData();
        setAppState({
          user: userData,
          isOnboardingCompleted: true,
          isLoading: false,
          error: null,
          currentScreen: 'MainTabs',
        });
      } else {
        setAppState({
          user: null,
          isOnboardingCompleted: false,
          isLoading: false,
          error: null,
          currentScreen: 'Onboarding',
        });
      }
    } catch (error) {
      setAppState({
        user: null,
        isOnboardingCompleted: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        currentScreen: 'Onboarding',
      });
    }
  };

  const completeOnboarding = async (userData: User) => {
    try {
      await storageService.saveUserData(userData);
      await storageService.setOnboardingCompleted();
      
      setAppState(prev => ({
        ...prev,
        user: userData,
        isOnboardingCompleted: true,
        currentScreen: 'MainTabs',
      }));
    } catch (error) {
      setAppState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to complete onboarding',
      }));
    }
  };

  const updateUser = async (userData: User) => {
    try {
      await storageService.saveUserData(userData);
      setAppState(prev => ({
        ...prev,
        user: userData,
      }));
    } catch (error) {
      setAppState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to update user',
      }));
    }
  };

  const logout = async () => {
    try {
      await storageService.clearAllData();
      setAppState({
        user: null,
        isOnboardingCompleted: false,
        isLoading: false,
        error: null,
        currentScreen: 'Onboarding',
      });
    } catch (error) {
      setAppState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to logout',
      }));
    }
  };

  const clearError = () => {
    setAppState(prev => ({ ...prev, error: null }));
  };

  return {
    appState,
    completeOnboarding,
    updateUser,
    logout,
    clearError,
  };
};
