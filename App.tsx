import React from "react";
import { StatusBar } from "expo-status-bar";
import Navigation from "./src/navigation";
import { useAppState } from "./src/hooks/useAppState";

export default function App() {
  const { appState, completeOnboarding, updateUser, logout, clearError } =
    useAppState();

  if (appState.isLoading) {
    return null; // You could add a splash screen here
  }

  return (
    <>
      <StatusBar style="auto" />
      <Navigation
        appState={appState}
        completeOnboarding={completeOnboarding}
        updateUser={updateUser}
        logout={logout}
        clearError={clearError}
      />
    </>
  );
}
