// Main navigation configuration

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";

// Import screens
import OnboardingScreen from "../screens/OnboardingScreen";
import HomeScreen from "../screens/HomeScreen";
import GoalsScreen from "../screens/GoalsScreen";
import ProgressScreen from "../screens/ProgressScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddGoalScreen from "../screens/AddGoalScreen";
import GoalDetailScreen from "../screens/GoalDetailScreen";
import SettingsScreen from "../screens/SettingsScreen";

// Import components
import TabBarIcon from "../components/TabBarIcon";

// Import types
import { AppState, User } from "../types";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Main tab navigator for authenticated users
 */
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <TabBarIcon
            route={route.name}
            focused={focused}
            color={color}
            size={size}
          />
        ),
        tabBarActiveTintColor: "#6366F1",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E5E7EB",
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="Goals"
        component={GoalsScreen}
        options={{ title: "Goals" }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{ title: "Progress" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
};

interface NavigationProps {
  appState: AppState;
  completeOnboarding: (userData: User) => Promise<void>;
  updateUser: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

/**
 * Main navigation component
 */
const Navigation = ({
  appState,
  completeOnboarding,
  updateUser,
  logout,
  clearError,
}: NavigationProps) => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6366F1",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {!appState.isOnboardingCompleted ? (
          // Onboarding flow
          <Stack.Screen name="Onboarding" options={{ headerShown: false }}>
            {(props) => (
              <OnboardingScreen
                {...props}
                completeOnboarding={completeOnboarding}
              />
            )}
          </Stack.Screen>
        ) : (
          // Main app flow
          <>
            <Stack.Screen
              name="MainTabs"
              component={MainTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddGoal"
              component={AddGoalScreen}
              options={{ title: "Add New Goal" }}
            />
            <Stack.Screen
              name="GoalDetail"
              component={GoalDetailScreen}
              options={{ title: "Goal Details" }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ title: "Settings" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
