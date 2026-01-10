import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { RegisterScreenStyles } from './RegisterScreen.styles';
import { useAuth } from '../../../services/firebase/auth';
import { SuccessScreen } from '../SuccessScreen';
import { useSnackbar } from '../../../contexts/SnackbarContext';

const EyeIcon: React.FC<{ visible: boolean }> = ({ visible }) => (
  <Feather
    name={visible ? 'eye' : 'eye-off'}
    size={20}
    color="#666"
  />
);

interface RegisterScreenProps {
  onBackToLogin?: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onBackToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { signUp } = useAuth();
  const { showSnackbar } = useSnackbar();

  const handleRegister = async () => {
    if (!fullName.trim()) {
      showSnackbar('Por favor, informe seu nome completo.', 'error');
      return;
    }

    if (!email.trim()) {
      showSnackbar('Por favor, informe seu e-mail.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showSnackbar('Por favor, informe um e-mail válido.', 'error');
      return;
    }

    if (!password) {
      showSnackbar('Por favor, informe uma senha.', 'error');
      return;
    }

    if (password.length < 6) {
      showSnackbar('A senha deve ter no mínimo 6 caracteres.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showSnackbar('As senhas não coincidem.', 'error');
      return;
    }

    setLoading(true);

    const result = await signUp({name: fullName,email, password});
    
    if (result.success) {
      setShowSuccess(true);
    } else {
      showSnackbar(
        result.error || 'Não foi possível criar sua conta. Tente novamente mais tarde.',
        'error'
      );
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (showSuccess) {
    return <SuccessScreen successProps={{ title: "Cadastro realizado!", hasLogo: true, subtitle: "Seja bem-vindo ao ByteBank!" }} />;
  }

  return (
    <SafeAreaView style={RegisterScreenStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={RegisterScreenStyles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={RegisterScreenStyles.scrollContent}
          style={RegisterScreenStyles.scrollView}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
        <View style={RegisterScreenStyles.header}>
          <Image
            source={require('../../../../assets/images/logo_positivo.png')}
            style={RegisterScreenStyles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={RegisterScreenStyles.content}>
          <Text style={RegisterScreenStyles.title}>Cadastre-se</Text>

          <View style={RegisterScreenStyles.form}>
            <View style={RegisterScreenStyles.inputContainer}>
              <TextInput
                style={RegisterScreenStyles.input}
                placeholder="Nome completo"
                placeholderTextColor="#999"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

            <View style={RegisterScreenStyles.inputContainer}>
              <TextInput
                style={RegisterScreenStyles.input}
                placeholder="Endereço de e-mail"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={RegisterScreenStyles.inputContainer}>
              <TextInput
                style={RegisterScreenStyles.input}
                placeholder="Senha"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={RegisterScreenStyles.eyeIconButton}
                onPress={togglePasswordVisibility}
                activeOpacity={0.7}
              >
                <EyeIcon visible={showPassword} />
              </TouchableOpacity>
            </View>

            <View style={RegisterScreenStyles.inputContainer}>
              <TextInput
                style={RegisterScreenStyles.input}
                placeholder="Confirmar senha"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={RegisterScreenStyles.eyeIconButton}
                onPress={toggleConfirmPasswordVisibility}
                activeOpacity={0.7}
              >
                <EyeIcon visible={showConfirmPassword} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[RegisterScreenStyles.registerButton, loading && RegisterScreenStyles.registerButtonDisabled]}
              onPress={handleRegister}
              activeOpacity={0.8}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={RegisterScreenStyles.registerButtonText}>Cadastrar</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={RegisterScreenStyles.footer}>
            <Text style={RegisterScreenStyles.footerText}>
              Já possui uma conta?{' '}
              <Text 
                style={RegisterScreenStyles.footerLink}
                onPress={() => {
                  onBackToLogin?.();
                }}
              >
                Acesse aqui
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
