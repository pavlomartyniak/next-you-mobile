// Onboarding screen with multiple steps

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, ONBOARDING_STEPS } from "../constants";
import { generateId } from "../utils";
import { User } from "../types";

const { width, height } = Dimensions.get("window");

interface OnboardingScreenProps {
  navigation: any;
  route: any;
  completeOnboarding: (userData: User) => Promise<void>;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  navigation,
  completeOnboarding,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    name: "",
    interests: [] as string[],
    goals: [] as string[],
  });
  const scrollViewRef = useRef<ScrollView>(null);

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      scrollViewRef.current?.scrollTo({
        x: (currentStep + 1) * width,
        animated: true,
      });
    } else {
      // Complete onboarding
      handleCompleteOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollViewRef.current?.scrollTo({
        x: (currentStep - 1) * width,
        animated: true,
      });
    }
  };

  const handleCompleteOnboarding = async () => {
    try {
      // Create user data from the collected information
      const user: User = {
        id: generateId(),
        name: userData.name || "User",
        email: "",
        interests: userData.interests,
        currentGoals: [],
        completedGoals: [],
        progress: {
          totalGoals: 0,
          completedGoals: 0,
          currentStreak: 0,
          longestStreak: 0,
          totalHoursSpent: 0,
          weeklyProgress: [],
        },
        preferences: {
          theme: "light",
          notifications: true,
          reminderTime: "09:00",
          language: "en",
          privacyLevel: "private",
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Call the completeOnboarding function from props
      await completeOnboarding(user);
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
    }
  };

  const renderWelcomeStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name="rocket" size={80} color={COLORS.primary} />
      </View>
      <Text style={styles.title}>Welcome to LifePathGuide</Text>
      <Text style={styles.description}>
        Your personal development companion that helps you discover your path,
        set meaningful goals, and track your progress towards becoming the best
        version of yourself.
      </Text>
      <View style={styles.featuresContainer}>
        <View style={styles.feature}>
          <Ionicons name="locate" size={24} color={COLORS.secondary} />
          <Text style={styles.featureText}>Set Clear Goals</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="trending-up" size={24} color={COLORS.secondary} />
          <Text style={styles.featureText}>Track Progress</Text>
        </View>
        <View style={styles.feature}>
          <Ionicons name="bulb" size={24} color={COLORS.secondary} />
          <Text style={styles.featureText}>Get Insights</Text>
        </View>
      </View>
    </View>
  );

  const renderGoalsStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name="list" size={80} color={COLORS.primary} />
      </View>
      <Text style={styles.title}>What are your goals?</Text>
      <Text style={styles.description}>
        Think about what you want to achieve in different areas of your life.
        Don't worry if you're not sure yet - we'll help you figure it out!
      </Text>
      <View style={styles.goalsContainer}>
        {[
          "Career Growth",
          "Health & Fitness",
          "Learning New Skills",
          "Better Relationships",
          "Financial Freedom",
        ].map((goal) => (
          <TouchableOpacity
            key={goal}
            style={[
              styles.goalChip,
              userData.goals.includes(goal) && styles.goalChipSelected,
            ]}
            onPress={() => {
              setUserData((prev) => ({
                ...prev,
                goals: prev.goals.includes(goal)
                  ? prev.goals.filter((g) => g !== goal)
                  : [...prev.goals, goal],
              }));
            }}
          >
            <Text
              style={[
                styles.goalChipText,
                userData.goals.includes(goal) && styles.goalChipTextSelected,
              ]}
            >
              {goal}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderInterestsStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name="heart" size={80} color={COLORS.primary} />
      </View>
      <Text style={styles.title}>What interests you?</Text>
      <Text style={styles.description}>
        Select topics and activities that excite you. This helps us provide
        personalized recommendations and motivation.
      </Text>
      <View style={styles.interestsContainer}>
        {[
          "Technology",
          "Sports",
          "Music",
          "Reading",
          "Travel",
          "Cooking",
          "Art",
          "Science",
          "Business",
          "Nature",
        ].map((interest) => (
          <TouchableOpacity
            key={interest}
            style={[
              styles.interestChip,
              userData.interests.includes(interest) &&
                styles.interestChipSelected,
            ]}
            onPress={() => {
              setUserData((prev) => ({
                ...prev,
                interests: prev.interests.includes(interest)
                  ? prev.interests.filter((i) => i !== interest)
                  : [...prev.interests, interest],
              }));
            }}
          >
            <Text
              style={[
                styles.interestChipText,
                userData.interests.includes(interest) &&
                  styles.interestChipTextSelected,
              ]}
            >
              {interest}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderPreferencesStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name="settings" size={80} color={COLORS.primary} />
      </View>
      <Text style={styles.title}>Personalize your experience</Text>
      <Text style={styles.description}>
        Set up your preferences to make the app work best for you. You can
        always change these later in settings.
      </Text>
      <View style={styles.preferencesContainer}>
        <View style={styles.preferenceItem}>
          <Ionicons name="notifications" size={24} color={COLORS.text} />
          <Text style={styles.preferenceText}>Daily reminders</Text>
          <TouchableOpacity style={styles.toggle}>
            <View
              style={[styles.toggleCircle, { backgroundColor: COLORS.primary }]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.preferenceItem}>
          <Ionicons name="moon" size={24} color={COLORS.text} />
          <Text style={styles.preferenceText}>Dark mode</Text>
          <TouchableOpacity style={styles.toggle}>
            <View style={styles.toggleCircle} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return renderWelcomeStep();
      case 1:
        return renderGoalsStep();
      case 2:
        return renderInterestsStep();
      case 3:
        return renderPreferencesStep();
      default:
        return renderWelcomeStep();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.gradient}
      >
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          style={styles.scrollView}
        >
          {ONBOARDING_STEPS.map((_, index) => (
            <View key={index} style={styles.page}>
              {renderStep()}
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.pagination}>
            {ONBOARDING_STEPS.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentStep && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>

          <View style={styles.buttonContainer}>
            {currentStep > 0 && (
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>
                {currentStep === ONBOARDING_STEPS.length - 1
                  ? "Get Started"
                  : "Next"}
              </Text>
              <Ionicons
                name={
                  currentStep === ONBOARDING_STEPS.length - 1
                    ? "checkmark"
                    : "arrow-forward"
                }
                size={20}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  page: {
    width,
    height: height - 200,
  },
  stepContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  iconContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  featuresContainer: {
    width: "100%",
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  featureText: {
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 15,
  },
  goalsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  goalChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    marginBottom: 10,
  },
  goalChipSelected: {
    backgroundColor: "#FFFFFF",
  },
  goalChipText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  goalChipTextSelected: {
    color: COLORS.primary,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  interestChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    marginBottom: 8,
  },
  interestChipSelected: {
    backgroundColor: "#FFFFFF",
  },
  interestChipText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  interestChipTextSelected: {
    color: COLORS.primary,
  },
  preferencesContainer: {
    width: "100%",
  },
  preferenceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  preferenceText: {
    fontSize: 16,
    color: "#FFFFFF",
    flex: 1,
    marginLeft: 15,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#FFFFFF",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    marginLeft: 5,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  nextButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
});

export default OnboardingScreen;
