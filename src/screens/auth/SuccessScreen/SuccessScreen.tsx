import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./SuccessScreen.styles";
import { RegisterScreenStyles } from "../RegisterScreen/RegisterScreen.styles";

export type SuccessScreenProps = {
  successProps: {
    title: string;
    subtitle?: string;
    hasLogo?: boolean;
  };
  onAddMore?: () => void;
  onGoHome?: () => void;
  addMoreText?: string;
  goHomeText?: string;
};

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  successProps,
  onAddMore,
  onGoHome,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {successProps.hasLogo ? (
          <View style={styles.header}>
            <Image
              source={require("../../../../assets/images/logo_positivo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        ) : (
          <></>
        )}

        <View style={styles.successContainer}>
          <Image
            source={require("../../../../assets/images/check.png")}
            style={styles.checkmarkImage}
            resizeMode="contain"
          />

          <Text style={styles.successTitle}>{successProps.title}</Text>
          {successProps.subtitle ? (
            <Text style={styles.successSubtitle}>
              Voltar para{" "}
              <Text style={styles.successSubtitleBold}>acessar conta</Text>.
            </Text>
          ) : (
            <></>
          )}

          {onAddMore || onGoHome ? (
            <View style={{ width: "100%" }}>
              {onAddMore && (
                <TouchableOpacity
                  style={RegisterScreenStyles.registerButton}
                  onPress={onAddMore}
                >
                  <Text style={RegisterScreenStyles.registerButtonText}>
                    Adicionar mais transações
                  </Text>
                </TouchableOpacity>
              )}
              {onGoHome && (
                <TouchableOpacity
                  style={RegisterScreenStyles.registerButtonOutline}
                  onPress={onGoHome}
                >
                  <Text style={RegisterScreenStyles.registerButtonOutlineText}>
                    Voltar para a tela inicial
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
