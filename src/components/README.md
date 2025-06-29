# Components Documentation

This directory contains all reusable React components used throughout the Emotion Detection application.

## Components Overview

### EmotionCard.jsx
Displays individual emotion predictions with confidence scores and visual progress bars.

**Props:**
- `emotion` (string): The emotion name
- `confidence` (number): Confidence score (0-1)
- `emoji` (string): Emoji representation of the emotion

**Features:**
- Animated progress bar showing confidence percentage
- Emoji visual indicator
- Dark mode support
- Responsive design

### Header.jsx
Application navigation header with theme toggle and routing.

**Features:**
- Responsive navigation menu
- Dark/light mode toggle
- Active route highlighting
- Brand logo with routing
- Mobile-friendly design

### ModelSelector.jsx
Dropdown component for selecting emotion detection models.

**Props:**
- `currentModel` (string): Currently selected model
- `onModelChange` (function): Callback for model selection
- `models` (array): Available models list

**Features:**
- Searchable dropdown interface
- Model performance indicators
- Keyboard navigation support
- Visual selection feedback

### WebcamCapture.jsx
Webcam integration component for real-time video capture.

**Props:**
- `onFrame` (function): Callback for captured frames
- `isActive` (boolean): Camera activation state

**Features:**
- Camera permission handling
- Frame rate optimization (1 FPS for efficiency)
- Error handling and retry mechanism
- Stream management and cleanup
- Canvas-based frame extraction

## Usage Examples

### EmotionCard
```jsx
<EmotionCard
  emotion="happy"
  confidence={0.85}
  emoji="😊"
/>
```

### Header
```jsx
<Header /> // No props needed - uses context and routing
```

### ModelSelector
```jsx
<ModelSelector
  currentModel="MobileNetV2_FER2013"
  onModelChange={handleModelChange}
  models={availableModels}
/>
```

### WebcamCapture
```jsx
<WebcamCapture
  onFrame={handleFrameCapture}
  isActive={isDetecting}
/>
```

## Design Principles

### Accessibility
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast color ratios

### Performance
- Optimized re-rendering with React.memo where appropriate
- Efficient state management
- Lazy loading for heavy components
- Debounced user interactions

### Responsive Design
- Mobile-first approach
- Flexible layouts using CSS Grid and Flexbox
- Breakpoint-based styling with Tailwind CSS
- Touch-friendly interface elements

### Theme Support
- Consistent dark/light mode implementation
- CSS custom properties for theme colors
- Smooth theme transition animations
- System theme detection

## Component Architecture

### State Management
- Local state for component-specific data
- Context API for global state (theme)
- Props for parent-child communication
- Custom hooks for shared logic

### Error Handling
- Graceful error boundaries
- User-friendly error messages
- Fallback UI components
- Retry mechanisms for failed operations

### Testing Considerations
- Components designed for easy testing
- Clear prop interfaces
- Minimal external dependencies
- Isolated component logic

## Best Practices

### Code Organization
- One component per file
- Clear naming conventions
- Consistent file structure
- Comprehensive prop documentation

### Performance Optimization
- Avoid unnecessary re-renders
- Use React.memo for expensive components
- Implement proper cleanup in useEffect
- Optimize image and video processing

### Styling Guidelines
- Tailwind CSS utility classes
- Consistent spacing (8px grid)
- Semantic color usage
- Responsive design patterns

## Future Enhancements

### Planned Features
- Voice control integration
- Gesture recognition
- Advanced camera controls
- Real-time performance metrics
- Export functionality for results

### Technical Improvements
- Component lazy loading
- Advanced error boundaries
- Performance monitoring
- Accessibility enhancements
- Progressive Web App features

## Troubleshooting

### Common Issues

1. **WebcamCapture not working**
   - Check camera permissions
   - Verify HTTPS in production
   - Test browser compatibility

2. **ModelSelector dropdown not opening**
   - Check z-index conflicts
   - Verify click event handlers
   - Test on different screen sizes

3. **EmotionCard animations not smooth**
   - Check CSS transition properties
   - Verify hardware acceleration
   - Test on different devices

4. **Header navigation not working**
   - Verify React Router setup
   - Check route definitions
   - Test browser history API

## Contributing

When adding or modifying components:

1. Follow existing patterns and conventions
2. Add comprehensive prop documentation
3. Implement proper error handling
4. Ensure responsive design
5. Test across different browsers and devices
6. Update this documentation

## Dependencies

### Core Dependencies
- React 18.3.1
- React Router DOM 6.20.1
- Lucide React 0.344.0

### Development Dependencies
- TypeScript support
- ESLint configuration
- Tailwind CSS integration

### Browser APIs Used
- MediaDevices API (camera access)
- Canvas API (frame capture)
- File API (image processing)
- Web Storage API (theme persistence)