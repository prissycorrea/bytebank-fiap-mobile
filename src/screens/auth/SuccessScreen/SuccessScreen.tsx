import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './SuccessScreen.styles';

export const SuccessScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={require('../../../../assets/images/logo_positivo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.successContainer}>
          <Image
            source={require('../../../../assets/images/check.png')}
            style={styles.checkmarkImage}
            resizeMode="contain"
          />

          <Text style={styles.successTitle}>Cadastro realizado!</Text>
          <Text style={styles.successSubtitle}>
            Voltar para <Text style={styles.successSubtitleBold}>acessa conta</Text>.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

