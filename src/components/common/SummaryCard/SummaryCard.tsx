import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { MaterialIcons } from "@expo/vector-icons";
import { SummaryCardStyles } from "./SummaryCard.styles";
import { PRIMARY_BLUE } from "../../layout/Colors";

const SummaryCard: React.FC = () => {
  const currentBalance: string = "12.450,00";
  return (
    <View style={SummaryCardStyles.headerContainer}>
      <View style={SummaryCardStyles.headerRow}>
        <View style={SummaryCardStyles.headerProfile}>
          {/* Ícone de Usuário */}
          {/* <MaterialIcons name="account-circle" size={40} color="#fff" /> */}
          <View style={SummaryCardStyles.headerAvatar}>
            <FontAwesome6
              name="user"
              size={24}
              color="black"
              style={SummaryCardStyles.headerAvatarIcon}
            />
          </View>
          <Text style={SummaryCardStyles.headerGreeting}>Oi, Joana!</Text>
        </View>
      </View>

      <View style={SummaryCardStyles.headerRow}>
        <View>
          <Text style={SummaryCardStyles.headerBalanceLabel}>Saldo atual</Text>
          <Text style={SummaryCardStyles.headerBalanceValue}>
            R$ {currentBalance}
          </Text>
        </View>
        {/* Botão Extrato */}
        <TouchableOpacity style={SummaryCardStyles.headerStatementButton}>
          <Text style={SummaryCardStyles.headerStatementButtonText}>
            Extrato
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={24}
            color={PRIMARY_BLUE}
          />
          {/* <MaterialIcons name="keyboard-arrow-right" size={18} color={PRIMARY_BLUE} /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SummaryCard;
