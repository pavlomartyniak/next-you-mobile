// Core types for LifePathGuide app

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  dateOfBirth?: string;
  interests: string[];
  currentGoals: Goal[];
  completedGoals: Goal[];
  progress: Progress;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  priority: 'low' | 'medium' | 'high';
  status: 'not_started' | 'in_progress' | 'completed' | 'paused';
  deadline?: string;
  milestones: Milestone[];
  progress: number; // 0-100
  createdAt: string;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate?: string;
  completedAt?: string;
}

export interface Progress {
  totalGoals: number;
  completedGoals: number;
  currentStreak: number;
  longestStreak: number;
  totalHoursSpent: number;
  weeklyProgress: WeeklyProgress[];
}

export interface WeeklyProgress {
  week: string;
  goalsCompleted: number;
  hoursSpent: number;
  productivityScore: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  reminderTime: string;
  language: string;
  privacyLevel: 'public' | 'private' | 'friends';
}

export type GoalCategory = 
  | 'career'
  | 'health'
  | 'education'
  | 'relationships'
  | 'finance'
  | 'personal_development'
  | 'hobbies'
  | 'spirituality'
  | 'travel'
  | 'other';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  component: string;
  isCompleted: boolean;
}

export interface AppState {
  user: User | null;
  isOnboardingCompleted: boolean;
  isLoading: boolean;
  error: string | null;
  currentScreen: string;
}

export interface NavigationProps {
  navigation: any;
  route: any;
}
