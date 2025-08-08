// App constants and configuration

export const APP_CONFIG = {
  name: 'LifePathGuide',
  version: '1.0.0',
  description: 'Your personal development companion',
};

export const COLORS = {
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  secondary: '#10B981',
  accent: '#F59E0B',
  background: '#FFFFFF',
  backgroundDark: '#1F2937',
  surface: '#F9FAFB',
  surfaceDark: '#374151',
  text: '#111827',
  textDark: '#F9FAFB',
  textSecondary: '#6B7280',
  textSecondaryDark: '#9CA3AF',
  border: '#E5E7EB',
  borderDark: '#4B5563',
  error: '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
};

export const GOAL_CATEGORIES = [
  { id: 'career', label: 'Career', icon: '💼', color: '#3B82F6' },
  { id: 'health', label: 'Health', icon: '🏃‍♂️', color: '#10B981' },
  { id: 'education', label: 'Education', icon: '📚', color: '#8B5CF6' },
  { id: 'relationships', label: 'Relationships', icon: '❤️', color: '#EC4899' },
  { id: 'finance', label: 'Finance', icon: '💰', color: '#F59E0B' },
  { id: 'personal_development', label: 'Personal Development', icon: '🧠', color: '#6366F1' },
  { id: 'hobbies', label: 'Hobbies', icon: '🎨', color: '#EF4444' },
  { id: 'spirituality', label: 'Spirituality', icon: '🕉️', color: '#8B5CF6' },
  { id: 'travel', label: 'Travel', icon: '✈️', color: '#06B6D4' },
  { id: 'other', label: 'Other', icon: '📌', color: '#6B7280' },
];

export const ONBOARDING_STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to LifePathGuide',
    description: 'Your journey to personal growth starts here',
    component: 'WelcomeStep',
  },
  {
    id: 'goals',
    title: 'What are your goals?',
    description: 'Tell us what you want to achieve in life',
    component: 'GoalsStep',
  },
  {
    id: 'interests',
    title: 'Your interests',
    description: 'What activities and topics excite you?',
    component: 'InterestsStep',
  },
  {
    id: 'preferences',
    title: 'Personalize your experience',
    description: 'Set up your preferences and notifications',
    component: 'PreferencesStep',
  },
];

export const MOTIVATIONAL_QUOTES = [
  'The only way to do great work is to love what you do. - Steve Jobs',
  'Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill',
  'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt',
  'Don\'t watch the clock; do what it does. Keep going. - Sam Levenson',
  'The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt',
  'It always seems impossible until it\'s done. - Nelson Mandela',
  'The way to get started is to quit talking and begin doing. - Walt Disney',
  'Your time is limited, don\'t waste it living someone else\'s life. - Steve Jobs',
];

export const STORAGE_KEYS = {
  USER_DATA: 'user_data',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  APP_PREFERENCES: 'app_preferences',
  GOALS_DATA: 'goals_data',
  PROGRESS_DATA: 'progress_data',
};

export const ANIMATION_CONFIG = {
  duration: 300,
  easing: 'ease-in-out',
};

export const NOTIFICATION_TYPES = {
  GOAL_REMINDER: 'goal_reminder',
  MILESTONE_COMPLETED: 'milestone_completed',
  DAILY_MOTIVATION: 'daily_motivation',
  WEEKLY_REVIEW: 'weekly_review',
};
