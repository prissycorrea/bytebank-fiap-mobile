import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { MaterialIcons } from "@expo/vector-icons";
import { SummaryCardStyles } from "./SummaryCard.styles";
import { PRIMARY_BLUE } from "../../../utils/colors";
import { useAuth } from "../../../services/firebase/auth";
import { createTransaction } from "../../../services/transactions";
import { formatCurrency } from "../../../utils/formatters";

const SummaryCard: React.FC<{ name: string; balance: string }> = ({
  name,
  balance,
}) => {
  const { logout, user, userData } = useAuth();

  const handleLogout = async () => {
    if (!user) return;

    await createTransaction(user?.uid, {
      transactionType: "INCOME",
      price: 5320,
      category: "Salario",
    });
  };

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
          <Text style={SummaryCardStyles.headerGreeting}>Oi, {name}!</Text>
        </View>
      </View>

      <View style={SummaryCardStyles.headerRow}>
        <View>
          <Text style={SummaryCardStyles.headerBalanceLabel}>Saldo atual</Text>
          <Text style={SummaryCardStyles.headerBalanceValue}>
            {formatCurrency(userData!.balance, true)}
          </Text>
        </View>
        {/* Botão Extrato */}
        <TouchableOpacity
          style={SummaryCardStyles.headerStatementButton}
          onPress={handleLogout}
        >
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
