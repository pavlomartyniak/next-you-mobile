// Goals screen with list and filtering

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GOAL_CATEGORIES } from '../constants';
import { Goal, GoalCategory } from '../types';
import { calculateProgress, getCategoryColor, getCategoryIcon } from '../utils';

interface GoalsScreenProps {
  navigation: any;
  route: any;
}

const GoalsScreen: React.FC<GoalsScreenProps> = ({ navigation }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [filteredGoals, setFilteredGoals] = useState<Goal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<GoalCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  useEffect(() => {
    loadGoals();
  }, []);

  useEffect(() => {
    filterGoals();
  }, [goals, selectedCategory, searchQuery, selectedStatus]);

  const loadGoals = () => {
    // In a real app, this would load from storage/API
    const mockGoals: Goal[] = [
      {
        id: '1',
        title: 'Learn React Native',
        description: 'Master React Native development and build mobile apps',
        category: 'education',
        priority: 'high',
        status: 'in_progress',
        deadline: '2024-12-31',
        milestones: [
          { id: '1', title: 'Complete basics', description: 'Learn fundamentals', isCompleted: true },
          { id: '2', title: 'Build first app', description: 'Create a simple app', isCompleted: false },
          { id: '3', title: 'Advanced concepts', description: 'Learn advanced features', isCompleted: false },
        ],
        progress: 33,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15',
      },
      {
        id: '2',
        title: 'Get in Shape',
        description: 'Improve physical fitness and health',
        category: 'health',
        priority: 'medium',
        status: 'in_progress',
        deadline: '2024-06-30',
        milestones: [
          { id: '1', title: 'Start running', description: 'Begin with 5km runs', isCompleted: true },
          { id: '2', title: 'Join gym', description: 'Start strength training', isCompleted: false },
          { id: '3', title: 'Run marathon', description: 'Complete a marathon', isCompleted: false },
        ],
        progress: 33,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-10',
      },
      {
        id: '3',
        title: 'Save $10,000',
        description: 'Build emergency fund and savings',
        category: 'finance',
        priority: 'high',
        status: 'not_started',
        deadline: '2024-12-31',
        milestones: [
          { id: '1', title: 'Create budget', description: 'Set up monthly budget', isCompleted: false },
          { id: '2', title: 'Save $5,000', description: 'Reach halfway point', isCompleted: false },
          { id: '3', title: 'Reach goal', description: 'Save full $10,000', isCompleted: false },
        ],
        progress: 0,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      },
    ];
    
    setGoals(mockGoals);
  };

  const filterGoals = () => {
    let filtered = goals;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(goal => goal.category === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(goal => goal.status === selectedStatus);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(goal =>
        goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        goal.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredGoals(filtered);
  };

  const renderCategoryFilter = () => (
    <View style={styles.filterContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[
            styles.filterChip,
            selectedCategory === 'all' && styles.filterChipSelected
          ]}
          onPress={() => setSelectedCategory('all')}
        >
          <Text style={[
            styles.filterChipText,
            selectedCategory === 'all' && styles.filterChipTextSelected
          ]}>
            All
          </Text>
        </TouchableOpacity>
        
        {GOAL_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.filterChip,
              selectedCategory === category.id && styles.filterChipSelected
            ]}
            onPress={() => setSelectedCategory(category.id as GoalCategory)}
          >
            <Text style={styles.filterChipIcon}>{category.icon}</Text>
            <Text style={[
              styles.filterChipText,
              selectedCategory === category.id && styles.filterChipTextSelected
            ]}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderStatusFilter = () => (
    <View style={styles.statusFilterContainer}>
      {[
        { key: 'all', label: 'All', color: COLORS.textSecondary },
        { key: 'not_started', label: 'Not Started', color: COLORS.error },
        { key: 'in_progress', label: 'In Progress', color: COLORS.accent },
        { key: 'completed', label: 'Completed', color: COLORS.success },
      ].map((status) => (
        <TouchableOpacity
          key={status.key}
          style={[
            styles.statusChip,
            selectedStatus === status.key && styles.statusChipSelected
          ]}
          onPress={() => setSelectedStatus(status.key)}
        >
          <Text style={[
            styles.statusChipText,
            selectedStatus === status.key && styles.statusChipTextSelected
          ]}>
            {status.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderGoalItem = ({ item }: { item: Goal }) => (
    <TouchableOpacity
      style={styles.goalCard}
      onPress={() => navigation.navigate('GoalDetail', { goalId: item.id })}
    >
      <View style={styles.goalHeader}>
        <View style={styles.goalTitleContainer}>
          <Text style={styles.goalTitle}>{item.title}</Text>
          <View style={[
            styles.priorityBadge,
            { backgroundColor: item.priority === 'high' ? COLORS.error : 
                           item.priority === 'medium' ? COLORS.accent : COLORS.success }
          ]}>
            <Text style={styles.priorityText}>{item.priority}</Text>
          </View>
        </View>
        <Text style={styles.goalDescription}>{item.description}</Text>
      </View>

      <View style={styles.goalMeta}>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryIcon}>{getCategoryIcon(item.category)}</Text>
          <Text style={styles.categoryText}>
            {GOAL_CATEGORIES.find(c => c.id === item.category)?.label}
          </Text>
        </View>
        
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{item.progress}%</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${item.progress}%` }
              ]} 
            />
          </View>
        </View>
      </View>

      <View style={styles.goalFooter}>
        <View style={styles.milestoneInfo}>
          <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
          <Text style={styles.milestoneText}>
            {item.milestones.filter(m => m.isCompleted).length}/{item.milestones.length} milestones
          </Text>
        </View>
        
        <View style={[
          styles.statusBadge,
          { backgroundColor: 
            item.status === 'completed' ? COLORS.success :
            item.status === 'in_progress' ? COLORS.accent :
            item.status === 'paused' ? COLORS.warning : COLORS.error
          }
        ]}>
          <Text style={styles.statusText}>
            {item.status.replace('_', ' ').toUpperCase()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="list" size={64} color={COLORS.textSecondary} />
      <Text style={styles.emptyStateTitle}>No goals found</Text>
      <Text style={styles.emptyStateText}>
        {searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all'
          ? 'Try adjusting your filters'
          : 'Create your first goal to get started'}
      </Text>
      {!searchQuery && selectedCategory === 'all' && selectedStatus === 'all' && (
        <TouchableOpacity
          style={styles.addFirstGoalButton}
          onPress={() => navigation.navigate('AddGoal')}
        >
          <Text style={styles.addFirstGoalButtonText}>Add Your First Goal</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Goals</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddGoal')}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search goals..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {renderCategoryFilter()}
      {renderStatusFilter()}

      <FlatList
        data={filteredGoals}
        renderItem={renderGoalItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  filterChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  filterChipText: {
    fontSize: 14,
    color: COLORS.text,
  },
  filterChipTextSelected: {
    color: '#FFFFFF',
  },
  statusFilterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  statusChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  statusChipText: {
    fontSize: 12,
    color: COLORS.text,
  },
  statusChipTextSelected: {
    color: '#FFFFFF',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalHeader: {
    marginBottom: 12,
  },
  goalTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
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
    textTransform: 'uppercase',
  },
  goalDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  goalMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  progressContainer: {
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  progressBar: {
    width: 60,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  goalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  milestoneInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  milestoneText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  addFirstGoalButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  addFirstGoalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GoalsScreen;
