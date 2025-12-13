import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen } from './src/screens/splash';
import { OnboardingScreen } from './src/screens/onboarding';
import { LoginScreen, RegisterScreen, SuccessScreen } from './src/screens/auth';
import { AuthProvider, useAuth } from './src/services/firebase/auth';
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
import DashboardScreen from './src/screens/home/DashboardScreen/DashboardScreen';

const AppContent: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const { isAuthenticated, loading: authLoading } = useAuth();
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

  const handleOnboardingComplete = () => {
    setOnboardingComplete(true);
  };

  if (!fontsLoaded || showSplash || authLoading) {
    return <SplashScreen />;
  }

  // Se o onboarding estiver completo, mostra a tela de login
  if (onboardingComplete) {
    if (isRegistering) {
      return <RegisterScreen onBackToLogin={() => setIsRegistering(false)} />;
    }
    return <LoginScreen onRegister={() => setIsRegistering(true)} />;
  }

  // Se o usuário estiver autenticado, vai direto para o Dashboard
  if (isAuthenticated) {
    return <DashboardScreen />;
  }
  
  if (!isAuthenticated) {
    return <LoginScreen onRegister={() => setIsRegistering(true)} />;
  }

  // Caso contrário, mostra o onboarding
  return <OnboardingScreen onComplete={handleOnboardingComplete} />;
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}