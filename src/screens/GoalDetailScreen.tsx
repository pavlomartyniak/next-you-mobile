// Goal detail screen with progress tracking

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GOAL_CATEGORIES } from '../constants';
import { Goal, Milestone } from '../types';
import { getCategoryIcon, getCategoryColor, formatDate } from '../utils';

interface GoalDetailScreenProps {
  navigation: any;
  route: any;
}

const GoalDetailScreen: React.FC<GoalDetailScreenProps> = ({ navigation, route }) => {
  const [goal, setGoal] = useState<Goal | null>(null);
  const { goalId } = route.params;

  useEffect(() => {
    loadGoal();
  }, [goalId]);

  const loadGoal = () => {
    // In a real app, this would load from storage/API
    const mockGoal: Goal = {
      id: goalId,
      title: 'Learn React Native',
      description: 'Master React Native development and build mobile apps. This includes understanding the fundamentals, building real-world applications, and staying updated with the latest features and best practices.',
      category: 'education',
      priority: 'high',
      status: 'in_progress',
      deadline: '2024-12-31',
      milestones: [
        { 
          id: '1', 
          title: 'Complete basics', 
          description: 'Learn fundamentals of React Native', 
          isCompleted: true,
          completedAt: '2024-01-10'
        },
        { 
          id: '2', 
          title: 'Build first app', 
          description: 'Create a simple todo app', 
          isCompleted: false,
          dueDate: '2024-02-15'
        },
        { 
          id: '3', 
          title: 'Advanced concepts', 
          description: 'Learn navigation, state management, and APIs', 
          isCompleted: false,
          dueDate: '2024-03-30'
        },
        { 
          id: '4', 
          title: 'Publish app', 
          description: 'Deploy app to app stores', 
          isCompleted: false,
          dueDate: '2024-04-30'
        },
      ],
      progress: 25,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-15',
    };
    
    setGoal(mockGoal);
  };

  const toggleMilestone = (milestoneId: string) => {
    if (!goal) return;

    const updatedMilestones = goal.milestones.map(milestone => {
      if (milestone.id === milestoneId) {
        return {
          ...milestone,
          isCompleted: !milestone.isCompleted,
          completedAt: !milestone.isCompleted ? new Date().toISOString() : undefined,
        };
      }
      return milestone;
    });

    const completedCount = updatedMilestones.filter(m => m.isCompleted).length;
    const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);

    setGoal({
      ...goal,
      milestones: updatedMilestones,
      progress: newProgress,
      updatedAt: new Date().toISOString(),
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return COLORS.success;
      case 'in_progress': return COLORS.accent;
      case 'paused': return COLORS.warning;
      default: return COLORS.error;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return COLORS.error;
      case 'medium': return COLORS.accent;
      default: return COLORS.success;
    }
  };

  const renderHeader = () => {
    if (!goal) return null;

    return (
      <LinearGradient
        colors={[getCategoryColor(goal.category), getCategoryColor(goal.category) + 'CC']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{goal.title}</Text>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };

  const renderProgress = () => {
    if (!goal) return null;

    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Progress</Text>
          <Text style={styles.progressPercentage}>{goal.progress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${goal.progress}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {goal.milestones.filter(m => m.isCompleted).length} of {goal.milestones.length} milestones completed
        </Text>
      </View>
    );
  };

  const renderGoalInfo = () => {
    if (!goal) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Goal Information</Text>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Description:</Text>
          <Text style={styles.infoValue}>{goal.description}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Category:</Text>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryIcon}>{getCategoryIcon(goal.category)}</Text>
            <Text style={styles.categoryText}>
              {GOAL_CATEGORIES.find(c => c.id === goal.category)?.label}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Priority:</Text>
          <View style={[
            styles.priorityBadge,
            { backgroundColor: getPriorityColor(goal.priority) }
          ]}>
            <Text style={styles.priorityText}>{goal.priority.toUpperCase()}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status:</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(goal.status) }
          ]}>
            <Text style={styles.statusText}>
              {goal.status.replace('_', ' ').toUpperCase()}
            </Text>
          </View>
        </View>

        {goal.deadline && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Deadline:</Text>
            <Text style={styles.infoValue}>{formatDate(goal.deadline)}</Text>
          </View>
        )}

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Created:</Text>
          <Text style={styles.infoValue}>{formatDate(goal.createdAt)}</Text>
        </View>
      </View>
    );
  };

  const renderMilestones = () => {
    if (!goal) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Milestones</Text>
        
        {goal.milestones.map((milestone, index) => (
          <TouchableOpacity
            key={milestone.id}
            style={styles.milestoneItem}
            onPress={() => toggleMilestone(milestone.id)}
          >
            <View style={styles.milestoneHeader}>
              <View style={styles.milestoneCheckbox}>
                <Ionicons 
                  name={milestone.isCompleted ? 'checkmark-circle' : 'ellipse-outline'} 
                  size={24} 
                  color={milestone.isCompleted ? COLORS.success : COLORS.textSecondary} 
                />
              </View>
              <View style={styles.milestoneContent}>
                <Text style={[
                  styles.milestoneTitle,
                  milestone.isCompleted && styles.milestoneTitleCompleted
                ]}>
                  {milestone.title}
                </Text>
                <Text style={styles.milestoneDescription}>{milestone.description}</Text>
                {milestone.dueDate && (
                  <Text style={styles.milestoneDueDate}>
                    Due: {formatDate(milestone.dueDate)}
                  </Text>
                )}
                {milestone.completedAt && (
                  <Text style={styles.milestoneCompletedDate}>
                    Completed: {formatDate(milestone.completedAt)}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderActions = () => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => Alert.alert('Edit Goal', 'This feature will be implemented soon!')}
      >
        <Ionicons name="create" size={20} color={COLORS.primary} />
        <Text style={styles.actionButtonText}>Edit Goal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, styles.deleteButton]}
        onPress={() => {
          Alert.alert(
            'Delete Goal',
            'Are you sure you want to delete this goal? This action cannot be undone.',
            [
              { text: 'Cancel', style: 'cancel' },
              { 
                text: 'Delete', 
                style: 'destructive',
                onPress: () => {
                  Alert.alert('Deleted', 'Goal has been deleted.');
                  navigation.goBack();
                }
              },
            ]
          );
        }}
      >
        <Ionicons name="trash" size={20} color={COLORS.error} />
        <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Delete Goal</Text>
      </TouchableOpacity>
    </View>
  );

  if (!goal) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading goal...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderProgress()}
        {renderGoalInfo()}
        {renderMilestones()}
        {renderActions()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  progressContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: COLORS.textSecondary,
    flex: 2,
    textAlign: 'right',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  categoryText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  priorityText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  milestoneItem: {
    marginBottom: 15,
  },
  milestoneHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  milestoneCheckbox: {
    marginRight: 12,
    marginTop: 2,
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  milestoneTitleCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  milestoneDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  milestoneDueDate: {
    fontSize: 12,
    color: COLORS.accent,
  },
  milestoneCompletedDate: {
    fontSize: 12,
    color: COLORS.success,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 5,
  },
  deleteButton: {
    borderColor: COLORS.error,
  },
  deleteButtonText: {
    color: COLORS.error,
  },
});

export default GoalDetailScreen;
