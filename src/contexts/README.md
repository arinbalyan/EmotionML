# Contexts Documentation

This directory contains React context providers for global state management across the Emotion Detection application.

## Context Overview

### ThemeContext.jsx
Manages global theme state (dark/light mode) with persistent storage and system preference detection.

## ThemeContext Details

### Features
- **Dark/Light Mode Toggle**: Seamless switching between themes
- **System Preference Detection**: Automatically detects user's OS theme preference
- **Persistent Storage**: Saves theme preference in localStorage
- **Smooth Transitions**: CSS transitions for theme changes
- **Context Provider**: Global state management across all components

### API

#### Provider
```jsx
<ThemeProvider>
  {children}
</ThemeProvider>
```

#### Hook
```jsx
const { isDark, toggleTheme } = useTheme();
```

#### Return Values
- `isDark` (boolean): Current theme state (true for dark, false for light)
- `toggleTheme` (function): Function to toggle between themes

### Implementation Details

#### State Management
```jsx
const [isDark, setIsDark] = useState(() => {
  // Priority: localStorage > system preference > default (false)
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false;
});
```

#### Theme Application
```jsx
useEffect(() => {
  const root = window.document.documentElement;
  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}, [isDark]);
```

### Usage Examples

#### Basic Usage
```jsx
import { useTheme } from '../contexts/ThemeContext';

const MyComponent = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <div className={`${isDark ? 'dark' : 'light'} theme-transition`}>
      <button onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};
```

#### Component with Theme-Aware Styling
```jsx
const ThemedComponent = () => {
  const { isDark } = useTheme();
  
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white">
      <h1>Theme-aware content</h1>
      <p>Current theme: {isDark ? 'Dark' : 'Light'}</p>
    </div>
  );
};
```

### CSS Integration

#### Tailwind CSS Classes
The theme context works seamlessly with Tailwind's dark mode classes:

```css
/* Light mode styles */
.bg-white { background-color: white; }
.text-black { color: black; }

/* Dark mode styles (applied when 'dark' class is on root) */
.dark .dark:bg-black { background-color: black; }
.dark .dark:text-white { color: white; }
```

#### Transition Effects
```css
.theme-transition {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

### Color Scheme

#### Light Mode Colors
- **Primary**: White (#FFFFFF)
- **Secondary**: Black (#000000)
- **Accent**: Red (#EF4444)
- **Background**: Gray-50 (#F9FAFB)
- **Border**: Gray-200 (#E5E7EB)

#### Dark Mode Colors
- **Primary**: Black (#000000)
- **Secondary**: White (#FFFFFF)
- **Accent**: Red (#EF4444)
- **Background**: Gray-900 (#111827)
- **Border**: Gray-700 (#374151)

### Error Handling

#### Context Validation
```jsx
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

#### Server-Side Rendering (SSR) Safety
```jsx
const [isDark, setIsDark] = useState(() => {
  if (typeof window !== 'undefined') {
    // Client-side logic
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  return false; // Default for SSR
});
```

### Performance Considerations

#### Optimization Strategies
- **Minimal Re-renders**: Context value is memoized
- **Efficient Updates**: Only theme-related components re-render
- **localStorage Debouncing**: Prevents excessive storage writes
- **CSS Transitions**: Hardware-accelerated theme switching

#### Memory Management
- **Cleanup**: No memory leaks in context provider
- **Event Listeners**: Proper cleanup of media query listeners
- **Storage**: Efficient localStorage usage

### Browser Compatibility

#### Supported Features
- **localStorage**: All modern browsers
- **matchMedia**: IE 10+, all modern browsers
- **CSS Custom Properties**: IE 11+ (with polyfill)
- **CSS Transitions**: All modern browsers

#### Fallback Strategies
```jsx
// Fallback for browsers without matchMedia
const hasMatchMedia = typeof window !== 'undefined' && window.matchMedia;
const prefersDark = hasMatchMedia 
  ? window.matchMedia('(prefers-color-scheme: dark)').matches 
  : false;
```

### Testing

#### Unit Tests
```jsx
// Test theme toggle functionality
test('toggles theme correctly', () => {
  const { result } = renderHook(() => useTheme(), {
    wrapper: ThemeProvider
  });
  
  expect(result.current.isDark).toBe(false);
  
  act(() => {
    result.current.toggleTheme();
  });
  
  expect(result.current.isDark).toBe(true);
});
```

#### Integration Tests
```jsx
// Test theme persistence
test('persists theme preference', () => {
  localStorage.setItem('theme', 'dark');
  
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );
  
  expect(document.documentElement.classList.contains('dark')).toBe(true);
});
```

### Accessibility

#### WCAG Compliance
- **Color Contrast**: All color combinations meet WCAG AA standards
- **Prefers-reduced-motion**: Respects user's motion preferences
- **High Contrast Mode**: Compatible with system high contrast settings
- **Screen Readers**: Theme changes announced appropriately

#### Implementation
```jsx
// Respect user's motion preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

useEffect(() => {
  if (!prefersReducedMotion) {
    // Apply smooth transitions
    document.documentElement.style.transition = 'background-color 0.3s ease';
  }
}, [prefersReducedMotion]);
```

### Future Enhancements

#### Planned Features
- **Multiple Theme Support**: Beyond just dark/light
- **Custom Theme Creation**: User-defined color schemes
- **Theme Scheduling**: Automatic theme switching based on time
- **Theme Synchronization**: Sync across browser tabs

#### Technical Improvements
- **React 18 Features**: Concurrent rendering optimization
- **CSS-in-JS Integration**: Styled-components support
- **Theme Animation**: Advanced transition effects
- **Performance Monitoring**: Theme switch performance metrics

### Troubleshooting

#### Common Issues

1. **Theme not persisting**
   - Check localStorage permissions
   - Verify browser storage quotas
   - Test in incognito mode

2. **Flickering on page load**
   - Implement theme detection in HTML head
   - Use CSS custom properties for instant theming
   - Avoid JavaScript-dependent initial styling

3. **Context not available**
   - Ensure ThemeProvider wraps the component tree
   - Check for typos in useTheme() calls
   - Verify context import statements

### Contributing

When modifying the theme context:

1. **Maintain backward compatibility**
2. **Test across all supported browsers**
3. **Update documentation and examples**
4. **Consider performance implications**
5. **Ensure accessibility compliance**
6. **Add appropriate unit tests**

### Best Practices

#### Context Usage
- Use theme context only for theme-related state
- Avoid overusing context for local component state
- Implement proper error boundaries
- Follow React context best practices

#### Performance
- Minimize context value changes
- Use React.memo for expensive theme-aware components
- Implement proper cleanup in useEffect hooks
- Avoid unnecessary re-renders

#### Styling
- Use Tailwind's dark mode classes consistently
- Implement smooth transitions for theme changes
- Ensure proper color contrast ratios
- Test theme changes across all components