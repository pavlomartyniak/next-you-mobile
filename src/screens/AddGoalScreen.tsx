// Add goal screen with form

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, GOAL_CATEGORIES } from '../constants';
import { Goal, GoalCategory } from '../types';
import { generateId } from '../utils';

interface AddGoalScreenProps {
  navigation: any;
  route: any;
}

const AddGoalScreen: React.FC<AddGoalScreenProps> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GoalCategory>('personal_development');
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [deadline, setDeadline] = useState('');
  const [milestones, setMilestones] = useState<string[]>(['']);

  const priorities = [
    { key: 'low', label: 'Low', color: COLORS.success },
    { key: 'medium', label: 'Medium', color: COLORS.accent },
    { key: 'high', label: 'High', color: COLORS.error },
  ];

  const addMilestone = () => {
    setMilestones([...milestones, '']);
  };

  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      const newMilestones = milestones.filter((_, i) => i !== index);
      setMilestones(newMilestones);
    }
  };

  const updateMilestone = (index: number, value: string) => {
    const newMilestones = [...milestones];
    newMilestones[index] = value;
    setMilestones(newMilestones);
  };

  const validateForm = (): boolean => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a goal title');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a goal description');
      return false;
    }
    if (milestones.filter(m => m.trim()).length === 0) {
      Alert.alert('Error', 'Please add at least one milestone');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const newGoal: Goal = {
      id: generateId(),
      title: title.trim(),
      description: description.trim(),
      category: selectedCategory,
      priority: selectedPriority,
      status: 'not_started',
      deadline: deadline || undefined,
      milestones: milestones
        .filter(m => m.trim())
        .map((milestone, index) => ({
          id: generateId(),
          title: milestone.trim(),
          description: `Milestone ${index + 1}`,
          isCompleted: false,
        })),
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In a real app, this would save to storage/API
    Alert.alert(
      'Success',
      'Goal created successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={24} color={COLORS.text} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Add New Goal</Text>
      <TouchableOpacity onPress={handleSave}>
        <Text style={styles.saveButton}>Save</Text>
      </TouchableOpacity>
    </View>
  );

  const renderBasicInfo = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Basic Information</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Goal Title *</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter your goal title"
          maxLength={100}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Description *</Text>
        <TextInput
          style={[styles.textInput, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe your goal in detail"
          multiline
          numberOfLines={4}
          maxLength={500}
        />
      </View>
    </View>
  );

  const renderCategory = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Category</Text>
      <View style={styles.categoriesContainer}>
        {GOAL_CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.categoryChipSelected
            ]}
            onPress={() => setSelectedCategory(category.id as GoalCategory)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.categoryTextSelected
            ]}>
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderPriority = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Priority</Text>
      <View style={styles.priorityContainer}>
        {priorities.map((priority) => (
          <TouchableOpacity
            key={priority.key}
            style={[
              styles.priorityChip,
              selectedPriority === priority.key && styles.priorityChipSelected
            ]}
            onPress={() => setSelectedPriority(priority.key as 'low' | 'medium' | 'high')}
          >
            <View style={[
              styles.priorityIndicator,
              { backgroundColor: priority.color }
            ]} />
            <Text style={[
              styles.priorityText,
              selectedPriority === priority.key && styles.priorityTextSelected
            ]}>
              {priority.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderDeadline = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Deadline (Optional)</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={deadline}
          onChangeText={setDeadline}
          placeholder="YYYY-MM-DD (e.g., 2024-12-31)"
        />
      </View>
    </View>
  );

  const renderMilestones = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Milestones *</Text>
        <TouchableOpacity onPress={addMilestone}>
          <Ionicons name="add-circle" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      
      {milestones.map((milestone, index) => (
        <View key={index} style={styles.milestoneContainer}>
          <TextInput
            style={styles.milestoneInput}
            value={milestone}
            onChangeText={(value) => updateMilestone(index, value)}
            placeholder={`Milestone ${index + 1}`}
          />
          {milestones.length > 1 && (
            <TouchableOpacity
              style={styles.removeMilestoneButton}
              onPress={() => removeMilestone(index)}
            >
              <Ionicons name="close-circle" size={20} color={COLORS.error} />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderBasicInfo()}
        {renderCategory()}
        {renderPriority()}
        {renderDeadline()}
        {renderMilestones()}
      </ScrollView>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  saveButton: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#FFFFFF',
  },
  categoryChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    color: COLORS.text,
  },
  categoryTextSelected: {
    color: '#FFFFFF',
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  priorityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#FFFFFF',
  },
  priorityChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  priorityIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  priorityText: {
    fontSize: 14,
    color: COLORS.text,
  },
  priorityTextSelected: {
    color: '#FFFFFF',
  },
  milestoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  milestoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },
  removeMilestoneButton: {
    padding: 5,
  },
});

export default AddGoalScreen;
