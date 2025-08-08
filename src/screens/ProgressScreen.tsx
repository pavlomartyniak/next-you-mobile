// Progress screen with charts and analytics

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants';
import { Progress, Goal } from '../types';
import { formatDuration } from '../utils';

const { width } = Dimensions.get('window');

interface ProgressScreenProps {
  navigation: any;
  route: any;
}

const ProgressScreen: React.FC<ProgressScreenProps> = ({ navigation }) => {
  const [progress, setProgress] = useState<Progress>({
    totalGoals: 0,
    completedGoals: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalHoursSpent: 0,
    weeklyProgress: [],
  });
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = () => {
    // In a real app, this would load from storage/API
    setProgress({
      totalGoals: 8,
      completedGoals: 3,
      currentStreak: 12,
      longestStreak: 25,
      totalHoursSpent: 156,
      weeklyProgress: [
        { week: 'Week 1', goalsCompleted: 2, hoursSpent: 15, productivityScore: 85 },
        { week: 'Week 2', goalsCompleted: 1, hoursSpent: 12, productivityScore: 72 },
        { week: 'Week 3', goalsCompleted: 3, hoursSpent: 18, productivityScore: 91 },
        { week: 'Week 4', goalsCompleted: 2, hoursSpent: 14, productivityScore: 78 },
      ],
    });
  };

  const renderHeader = () => (
    <LinearGradient
      colors={[COLORS.primary, COLORS.primaryDark]}
      style={styles.header}
    >
      <Text style={styles.headerTitle}>Your Progress</Text>
      <Text style={styles.headerSubtitle}>Track your journey to success</Text>
    </LinearGradient>
  );

  const renderOverviewCards = () => (
    <View style={styles.overviewContainer}>
      <View style={styles.overviewCard}>
        <View style={styles.cardIcon}>
          <Ionicons name="trophy" size={24} color={COLORS.accent} />
        </View>
        <Text style={styles.cardNumber}>{progress.completedGoals}</Text>
        <Text style={styles.cardLabel}>Goals Completed</Text>
      </View>

      <View style={styles.overviewCard}>
        <View style={styles.cardIcon}>
          <Ionicons name="flame" size={24} color={COLORS.error} />
        </View>
        <Text style={styles.cardNumber}>{progress.currentStreak}</Text>
        <Text style={styles.cardLabel}>Day Streak</Text>
      </View>

      <View style={styles.overviewCard}>
        <View style={styles.cardIcon}>
          <Ionicons name="time" size={24} color={COLORS.secondary} />
        </View>
        <Text style={styles.cardNumber}>{formatDuration(progress.totalHoursSpent * 60)}</Text>
        <Text style={styles.cardLabel}>Time Spent</Text>
      </View>
    </View>
  );

  const renderPeriodSelector = () => (
    <View style={styles.periodSelector}>
      {[
        { key: 'week', label: 'Week' },
        { key: 'month', label: 'Month' },
        { key: 'year', label: 'Year' },
      ].map((period) => (
        <TouchableOpacity
          key={period.key}
          style={[
            styles.periodButton,
            selectedPeriod === period.key && styles.periodButtonActive
          ]}
          onPress={() => setSelectedPeriod(period.key as 'week' | 'month' | 'year')}
        >
          <Text style={[
            styles.periodButtonText,
            selectedPeriod === period.key && styles.periodButtonTextActive
          ]}>
            {period.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderProgressChart = () => (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Weekly Progress</Text>
      <View style={styles.chart}>
        {progress.weeklyProgress.map((week, index) => (
          <View key={week.week} style={styles.chartBar}>
            <View style={styles.barContainer}>
              <View 
                style={[
                  styles.bar,
                  { 
                    height: (week.productivityScore / 100) * 120,
                    backgroundColor: index === progress.weeklyProgress.length - 1 
                      ? COLORS.primary 
                      : COLORS.primary + '80'
                  }
                ]} 
              />
            </View>
            <Text style={styles.barLabel}>{week.week}</Text>
            <Text style={styles.barValue}>{week.productivityScore}%</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAchievements = () => (
    <View style={styles.achievementsContainer}>
      <Text style={styles.sectionTitle}>Recent Achievements</Text>
      <View style={styles.achievementsList}>
        {[
          { id: '1', title: 'First Goal Completed', description: 'You completed your first goal!', icon: '🎉', date: '2 days ago' },
          { id: '2', title: '7-Day Streak', description: 'You maintained a 7-day activity streak', icon: '🔥', date: '1 week ago' },
          { id: '3', title: 'Goal Master', description: 'You completed 5 goals in total', icon: '🏆', date: '2 weeks ago' },
        ].map((achievement) => (
          <View key={achievement.id} style={styles.achievementItem}>
            <Text style={styles.achievementIcon}>{achievement.icon}</Text>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
              <Text style={styles.achievementDate}>{achievement.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderInsights = () => (
    <View style={styles.insightsContainer}>
      <Text style={styles.sectionTitle}>Insights</Text>
      <View style={styles.insightsList}>
        <View style={styles.insightCard}>
          <Ionicons name="trending-up" size={24} color={COLORS.success} />
          <Text style={styles.insightTitle}>You're on fire!</Text>
          <Text style={styles.insightText}>
            Your productivity has increased by 25% this week compared to last week.
          </Text>
        </View>

        <View style={styles.insightCard}>
          <Ionicons name="time" size={24} color={COLORS.accent} />
          <Text style={styles.insightTitle}>Best time to work</Text>
          <Text style={styles.insightText}>
            You're most productive between 9 AM and 11 AM. Try to schedule important tasks during this time.
          </Text>
        </View>

        <View style={styles.insightCard}>
          <Ionicons name="bulb" size={24} color={COLORS.primary} />
          <Text style={styles.insightTitle}>Goal suggestion</Text>
          <Text style={styles.insightText}>
            Based on your interests, you might enjoy setting a goal related to learning a new skill.
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderOverviewCards()}
        {renderPeriodSelector()}
        {renderProgressChart()}
        {renderAchievements()}
        {renderInsights()}
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
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  overviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 20,
  },
  overviewCard: {
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
  cardIcon: {
    marginBottom: 8,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  periodButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  periodButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  periodButtonText: {
    fontSize: 14,
    color: COLORS.text,
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 160,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    height: 120,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  bar: {
    width: 20,
    borderRadius: 10,
  },
  barLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  barValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  achievementsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  achievementsList: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  insightsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  insightsList: {
    gap: 12,
  },
  insightCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 8,
    marginBottom: 4,
  },
  insightText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});

export default ProgressScreen;
