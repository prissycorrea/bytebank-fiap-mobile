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
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigator } from "./src/navigation/TabNavigator";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { getMyTransactions } from "./src/services/transactions";

const AppContent: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const { isAuthenticated, loading: authLoading, user } = useAuth();

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
  const [checkingTransactions, setCheckingTransactions] = useState(false);
  const [initialRoute, setInitialRoute] = useState("MainTabs");

  // Novo efeito para verificar transações quando o usuário estiver autenticado
  useEffect(() => {
    if (isAuthenticated && !authLoading) { // Só verifica se terminou o loading do auth
      setCheckingTransactions(true);
      // Assumindo que useAuth fornece o uid no user object
      // useAuth retorna { user, ... }
      // Precisamos pegar o user do hook useAuth, que já foi chamado lá em cima
      // const { user } = useAuth(); // Já chamado na linha 29
      // Mas user pode ser null se isAuthenticated for false, mas aqui checamos isAuthenticated.
      // Typescript pode reclamar, então checamos user.
      // O hook useAuth retorna user como User | null.

      // CORREÇÃO: O user do hook é pego na linha 29, mas precisamos garantir que ele esteja atualizado.
      // Como isAuthenticated é true, user deve existir.

      // Pequeno detalhe: getMyTransactions precisa do UID.
      // Vou usar uma função async dentro do effect.
      const checkData = async () => {
        try {
          // user pode ser null aqui se o state ainda não atualizou, mas isAuthenticated diz que sim.
          // Vamos dar um bypass seguro.
          // Na verdade, useAuth já retornou o user.
          // Mas para garantir, vamos pegar o user atual do contexto ou confiar na var user.
          // Vamos usar a variavel user do escopo do componente.
          if (user?.uid) {
            const transactions = await getMyTransactions(user.uid);
            if (transactions.length === 0) {
              setInitialRoute("EmptyState");
            } else {
              setInitialRoute("MainTabs");
            }
          }
        } catch (error) {
          console.log("Erro ao buscar transações iniciais", error);
        } finally {
          setCheckingTransactions(false);
        }
      };
      checkData();
    }
  }, [isAuthenticated, authLoading, user]);


  if (!fontsLoaded || showSplash || authLoading || checkingTransactions) {
    return <SplashScreen />;
  }

  // 2. Se o usuário já está logado, vai direto pro Dashboard (via AppNavigator)
  if (isAuthenticated) {
    return (
      <NavigationContainer>
        <AppNavigator initialRouteName={initialRoute} />
      </NavigationContainer>
    );
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
