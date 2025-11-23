import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthProvider, useAuth } from './src/services/firebase/auth';

function Main() {
  // Chame o hook DENTRO do componente
  const { login, signUp } = useAuth();

  return (
    <View style={styles.container}>
      <Text>Hello, React Native!</Text>
      <StatusBar style="auto" />
      <Button title="Cadastro" onPress={() => {
        signUp('jcmagalhaes@teste.com.br', '123456');
      }} />
      <Button title="Login" onPress={() => login('jcmagalhaes@teste.com.br', '123456')} />
    </View>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
