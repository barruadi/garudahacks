import { useState, useEffect } from 'react';

export const useTutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false);

  // Check if user has seen tutorial before
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      // Small delay to ensure page is loaded
      const timer = setTimeout(() => {
        setShowTutorial(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const completeTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('hasSeenTutorial', 'true');
  };

  const skipTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem('hasSeenTutorial', 'true');
  };

  const restartTutorial = () => {
    setShowTutorial(true);
  };

  const resetTutorialState = () => {
    localStorage.removeItem('hasSeenTutorial');
    setShowTutorial(true);
  };

  return {
    showTutorial,
    completeTutorial,
    skipTutorial,
    restartTutorial,
    resetTutorialState
  };
};