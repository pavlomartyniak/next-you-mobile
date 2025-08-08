// Tab bar icon component

import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface TabBarIconProps {
  route: string;
  focused: boolean;
  color: string;
  size: number;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ route, focused, color, size }) => {
  let iconName: keyof typeof Ionicons.glyphMap;

  switch (route) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Goals':
      iconName = focused ? 'list' : 'list-outline';
      break;
    case 'Progress':
      iconName = focused ? 'trending-up' : 'trending-up-outline';
      break;
    case 'Profile':
      iconName = focused ? 'person' : 'person-outline';
      break;
    default:
      iconName = 'help-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

export default TabBarIcon;
