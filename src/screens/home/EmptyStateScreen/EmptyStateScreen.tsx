import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./EmptyStateScreen.styles";
import { Button } from "../../../components/common/Button";

const emptyStateImage = require("../../../../assets/images/empty-state.png");

interface EmptyStateScreenProps {
  onAddTransaction?: () => void;
  onGoHome?: () => void;
}

export const EmptyStateScreen: React.FC<EmptyStateScreenProps> = ({
  onAddTransaction,
  onGoHome,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={emptyStateImage}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Nenhuma movimentação</Text>

      <Text style={styles.subtitle}>
        Que tal adicionar sua primeira transação?
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Adicionar Transação"
          variant="primary"
          onPress={onAddTransaction}
          style={styles.button}
        />

        <Button
          title="Ir para Home"
          variant="outline"
          onPress={onGoHome}
          style={styles.button}
        />
      </View>
    </View>
  );
};
