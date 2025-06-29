import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Home from './pages/Home';
import Detection from './pages/Detection';
import ImageDetection from './pages/ImageDetection';
import HowItWorks from './pages/HowItWorks';
import Documentation from './pages/Documentation';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-black transition-colors">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detection" element={<Detection />} />
            <Route path="/image-detection" element={<ImageDetection />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/documentation" element={<Documentation />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;