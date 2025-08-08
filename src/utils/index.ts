// Utility functions for the app

import { Goal, Progress, GoalCategory } from '../types';

/**
 * Generate a unique ID for new items
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Format date to readable string
 */
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Calculate days until deadline
 */
export const getDaysUntilDeadline = (deadline: string): number => {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Calculate goal progress percentage
 */
export const calculateProgress = (goal: Goal): number => {
  if (goal.milestones.length === 0) return 0;
  
  const completedMilestones = goal.milestones.filter(m => m.isCompleted).length;
  return Math.round((completedMilestones / goal.milestones.length) * 100);
};

/**
 * Get category color
 */
export const getCategoryColor = (category: GoalCategory): string => {
  const categoryMap: Record<GoalCategory, string> = {
    career: '#3B82F6',
    health: '#10B981',
    education: '#8B5CF6',
    relationships: '#EC4899',
    finance: '#F59E0B',
    personal_development: '#6366F1',
    hobbies: '#EF4444',
    spirituality: '#8B5CF6',
    travel: '#06B6D4',
    other: '#6B7280',
  };
  
  return categoryMap[category] || '#6B7280';
};

/**
 * Get category icon
 */
export const getCategoryIcon = (category: GoalCategory): string => {
  const iconMap: Record<GoalCategory, string> = {
    career: '💼',
    health: '🏃‍♂️',
    education: '📚',
    relationships: '❤️',
    finance: '💰',
    personal_development: '🧠',
    hobbies: '🎨',
    spirituality: '🕉️',
    travel: '✈️',
    other: '📌',
  };
  
  return iconMap[category] || '📌';
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Get random motivational quote
 */
export const getRandomQuote = (): string => {
  const quotes = [
    'The only way to do great work is to love what you do. - Steve Jobs',
    'Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill',
    'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt',
    'Don\'t watch the clock; do what it does. Keep going. - Sam Levenson',
    'The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt',
    'It always seems impossible until it\'s done. - Nelson Mandela',
    'The way to get started is to quit talking and begin doing. - Walt Disney',
    'Your time is limited, don\'t waste it living someone else\'s life. - Steve Jobs',
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
};

/**
 * Calculate streak from progress data
 */
export const calculateStreak = (progress: Progress): number => {
  // This is a simplified calculation
  // In a real app, you'd track daily completions
  return progress.currentStreak;
};

/**
 * Format time duration
 */
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};

/**
 * Debounce function for search inputs
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
