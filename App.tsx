import React, { useState, useEffect } from 'react';
import {
  useFonts,
  WorkSans_400Regular,
  WorkSans_700Bold,
} from '@expo-google-fonts/work-sans';
import {
  Poppins_400Regular,
} from '@expo-google-fonts/poppins';
import * as SplashScreenExpo from 'expo-splash-screen';
import { SplashScreen } from './src/screens/splash';
import { OnboardingScreen } from './src/screens/home/onboarding';

SplashScreenExpo.preventAutoHideAsync();

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fontsLoaded] = useFonts({
    WorkSans: WorkSans_400Regular,
    'WorkSans-Bold': WorkSans_700Bold,
    Poppins: Poppins_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreenExpo.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded || showSplash) {
    return <SplashScreen />;
  }

  return <OnboardingScreen />;
}