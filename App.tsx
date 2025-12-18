import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font"; // <--- 1. IMPORTANTE: Adicione isso

import { SplashScreen } from "./src/screens/splash";
import { OnboardingScreen } from "./src/screens/onboarding";
import { LoginScreen, RegisterScreen, SuccessScreen } from "./src/screens/auth";
import { AuthProvider, useAuth } from "./src/services/firebase/auth";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import {
  WorkSans_400Regular,
  WorkSans_500Medium,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
} from "@expo-google-fonts/work-sans";
import DashboardScreen from "./src/screens/home/DashboardScreen/DashboardScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

const AppContent: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const { isAuthenticated, loading: authLoading } = useAuth();

  const [fontsLoaded] = useFonts({
    Poppins: Poppins_400Regular,
    Poppins_500Medium: Poppins_500Medium,
    Poppins_600SemiBold: Poppins_600SemiBold,
    Poppins_700Bold: Poppins_700Bold,
    WorkSans_400Regular: WorkSans_400Regular,
    WorkSans_500Medium: WorkSans_500Medium,
    WorkSans_600SemiBold: WorkSans_600SemiBold,
    WorkSans_700Bold: WorkSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  const handleOnboardingComplete = () => {
    setOnboardingComplete(true);
  };

  // 1. Splash e Carregamento (Prioridade Máxima)
  if (!fontsLoaded || showSplash || authLoading) {
    return <SplashScreen />;
  }

  // 2. Se o usuário já está logado, vai direto pro Dashboard (Mudei a ordem para priorizar o login)
  if (isAuthenticated) {
    return <DashboardScreen />;
  }

  // 3. Se não está logado, verifica fluxo de Auth vs Onboarding
  if (onboardingComplete) {
    if (isRegistering) {
      return <RegisterScreen onBackToLogin={() => setIsRegistering(false)} />;
    }
    return <LoginScreen onRegister={() => setIsRegistering(true)} />;
  }

  // Esse bloco aqui embaixo era redundante com o de cima, pode simplificar assim:
  // Se chegou aqui, não está autenticado e não completou onboarding (ou completou e caiu no if acima)

  // 4. Caso contrário, mostra o onboarding
  return <OnboardingScreen onComplete={handleOnboardingComplete} />;
};

export default function App() {
  return (
    // <--- 2. IMPORTANTE: Envolva tudo com o SafeAreaProvider
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
