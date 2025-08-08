# LifePathGuide - Personal Development App

A React Native Expo app designed to help people discover their life path and achieve personal development goals.

## Features

### 🎯 Goal Management
- Create and track personal goals across different life categories
- Set milestones and track progress
- Priority levels and deadlines
- Visual progress indicators

### 📊 Progress Tracking
- Comprehensive analytics and insights
- Weekly progress charts
- Achievement system
- Streak tracking

### 🚀 Onboarding Experience
- Multi-step onboarding process
- Goal and interest discovery
- Personalized recommendations
- User preference setup

### 🎨 Modern UI/UX
- Clean and intuitive interface
- Smooth animations and transitions
- Responsive design
- Dark/light theme support

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for routing
- **Expo Linear Gradient** for beautiful gradients
- **AsyncStorage** for local data persistence
- **Expo Vector Icons** for icons

## Project Structure

```
src/
├── components/          # Reusable UI components
├── constants/          # App constants and configuration
├── hooks/             # Custom React hooks
├── navigation/        # Navigation configuration
├── screens/           # App screens
├── services/          # Data and API services
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd LifePathGuide
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## App Screens

### Onboarding Flow
- **Welcome**: Introduction to the app
- **Goals**: Goal discovery and selection
- **Interests**: Interest and passion identification
- **Preferences**: App customization setup

### Main App
- **Home**: Dashboard with quick actions and today's focus
- **Goals**: Goal list with filtering and search
- **Progress**: Analytics and achievement tracking
- **Profile**: User profile and settings

### Goal Management
- **Add Goal**: Create new goals with milestones
- **Goal Detail**: View and manage individual goals
- **Settings**: App preferences and data management

## Key Features Implementation

### Goal Categories
- Career & Professional Development
- Health & Fitness
- Education & Learning
- Relationships & Social
- Finance & Money
- Personal Development
- Hobbies & Interests
- Spirituality & Wellness
- Travel & Adventure

### Progress Tracking
- Milestone completion tracking
- Visual progress bars
- Achievement badges
- Streak counting
- Time spent tracking

### Data Persistence
- Local storage using AsyncStorage
- User preferences
- Goal and progress data
- Onboarding completion status

## Best Practices Implemented

### Code Quality
- TypeScript for type safety
- Consistent code formatting
- Clear component structure
- Proper error handling
- Comprehensive comments

### Performance
- Optimized re-renders
- Efficient list rendering
- Lazy loading where appropriate
- Memory leak prevention

### User Experience
- Intuitive navigation
- Responsive design
- Loading states
- Error handling
- Accessibility considerations

## Future Enhancements

### Planned Features
- Cloud synchronization
- Social features and sharing
- Advanced analytics
- Goal templates
- Reminder system
- Export/import functionality
- Multi-language support
- Push notifications

### Technical Improvements
- State management (Redux/Zustand)
- Unit and integration tests
- Performance optimization
- Offline support
- Deep linking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
