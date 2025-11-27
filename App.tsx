import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen } from './src/screens/splash';
import { OnboardingScreen } from './src/screens/onboarding';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
} from '@expo-google-fonts/work-sans';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fontsLoaded] = useFonts({
    'Poppins': Poppins_400Regular,
    'Poppins_500Medium': Poppins_500Medium,
    'Poppins_600SemiBold': Poppins_600SemiBold,
    'Poppins_700Bold': Poppins_700Bold,
    'WorkSans_400Regular': WorkSans_400Regular,
    'WorkSans_500Medium': WorkSans_500Medium,
    'WorkSans_600SemiBold': WorkSans_600SemiBold,
    'WorkSans_700Bold': WorkSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000); // 3 segundos

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || showSplash) {
    return <SplashScreen />;
  }

  return <OnboardingScreen />;
}