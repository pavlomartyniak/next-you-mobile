// Home screen with dashboard and quick actions

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, MOTIVATIONAL_QUOTES } from '../constants';
import { getRandomQuote, formatDate } from '../utils';
import { Goal, Progress } from '../types';

interface HomeScreenProps {
  navigation: any;
  route: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [quote, setQuote] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [userProgress, setUserProgress] = useState<Progress>({
    totalGoals: 0,
    completedGoals: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalHoursSpent: 0,
    weeklyProgress: [],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // In a real app, this would load from storage/API
    setQuote(getRandomQuote());
    setUserProgress({
      totalGoals: 5,
      completedGoals: 2,
      currentStreak: 7,
      longestStreak: 15,
      totalHoursSpent: 45,
      weeklyProgress: [],
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderHeader = () => (
    <LinearGradient
      colors={[COLORS.primary, COLORS.primaryDark]}
      style={styles.header}
    >
      <View style={styles.headerContent}>
        <View>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.userName}>John Doe</Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Ionicons name="person" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <Ionicons name="locate" size={24} color={COLORS.primary} />
        <Text style={styles.statNumber}>{userProgress.totalGoals}</Text>
        <Text style={styles.statLabel}>Active Goals</Text>
      </View>
      <View style={styles.statCard}>
        <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
        <Text style={styles.statNumber}>{userProgress.completedGoals}</Text>
        <Text style={styles.statLabel}>Completed</Text>
      </View>
      <View style={styles.statCard}>
        <Ionicons name="flame" size={24} color={COLORS.accent} />
        <Text style={styles.statNumber}>{userProgress.currentStreak}</Text>
        <Text style={styles.statLabel}>Day Streak</Text>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('AddGoal')}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryDark]}
            style={styles.actionGradient}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
            <Text style={styles.actionText}>Add Goal</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Goals')}
        >
          <LinearGradient
            colors={[COLORS.secondary, '#059669']}
            style={styles.actionGradient}
          >
            <Ionicons name="list" size={24} color="#FFFFFF" />
            <Text style={styles.actionText}>View Goals</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Progress')}
        >
          <LinearGradient
            colors={[COLORS.accent, '#D97706']}
            style={styles.actionGradient}
          >
            <Ionicons name="trending-up" size={24} color="#FFFFFF" />
            <Text style={styles.actionText}>Progress</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTodayGoals = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today's Focus</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Goals')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.goalsList}>
        {[
          { id: '1', title: 'Complete React Native course', progress: 75, category: 'education' },
          { id: '2', title: 'Go for a 30-minute run', progress: 0, category: 'health' },
          { id: '3', title: 'Read 20 pages of book', progress: 50, category: 'personal_development' },
        ].map((goal) => (
          <TouchableOpacity
            key={goal.id}
            style={styles.goalItem}
            onPress={() => navigation.navigate('GoalDetail', { goalId: goal.id })}
          >
            <View style={styles.goalInfo}>
              <Text style={styles.goalTitle}>{goal.title}</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${goal.progress}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>{goal.progress}% complete</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderMotivation = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Daily Motivation</Text>
      <View style={styles.quoteContainer}>
        <Ionicons name="chatbubble" size={24} color={COLORS.primary} style={styles.quoteIcon} />
        <Text style={styles.quoteText}>{quote}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderHeader()}
        {renderStats()}
        {renderQuickActions()}
        {renderTodayGoals()}
        {renderMotivation()}
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
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.primary,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  goalsList: {
    gap: 10,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  quoteContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quoteIcon: {
    marginBottom: 10,
  },
  quoteText: {
    fontSize: 16,
    color: COLORS.text,
    fontStyle: 'italic',
    lineHeight: 24,
  },
});

export default HomeScreen;
