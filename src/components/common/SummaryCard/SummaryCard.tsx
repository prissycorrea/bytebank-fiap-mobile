import React, { useState } from "react";
import { Text, TouchableOpacity, View, Modal } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { MaterialIcons } from "@expo/vector-icons";
import { SummaryCardStyles } from "./SummaryCard.styles";
import { PRIMARY_BLUE } from "../../../utils/colors";
import { useAuth } from "../../../services/firebase/auth";
import { formatCurrency } from "../../../utils/formatters";
import { useNavigation } from "@react-navigation/native";

const SummaryCard: React.FC<{ name: string; balance: number }> = ({
  name,
  balance,
}) => {
  const { logout, user, userData } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation();

  const onToGoExtrato = () => {
    navigation.navigate("Transactions" as never);
  }

  const handleLogoutPress = () => {
    setShowMenu(false);
    logout();
  };

  return (
    <View style={SummaryCardStyles.headerContainer}>
      <View style={SummaryCardStyles.headerRow}>
        <View style={SummaryCardStyles.headerProfile}>
          {/* Ícone de Usuário */}
          <TouchableOpacity
            style={SummaryCardStyles.headerAvatar}
            onPress={() => setShowMenu(true)}
          >
            <FontAwesome6
              name="user"
              size={24}
              color="black"
              style={SummaryCardStyles.headerAvatarIcon}
            />
          </TouchableOpacity>
          <Text style={SummaryCardStyles.headerGreeting}>Oi, {name}!</Text>
        </View>
      </View>

      <Modal
        visible={showMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity
          style={SummaryCardStyles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowMenu(false)}
        >
          <View
            style={SummaryCardStyles.menuContainer}
            onStartShouldSetResponder={() => true}
          >
            <TouchableOpacity
              style={SummaryCardStyles.menuItem}
              onPress={handleLogoutPress}
            >
              <MaterialIcons name="logout" size={24} color={PRIMARY_BLUE} />
              <Text style={SummaryCardStyles.menuItemText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <View style={SummaryCardStyles.headerRow}>
        <View>
          <Text style={SummaryCardStyles.headerBalanceLabel}>Saldo atual</Text>
          <Text style={SummaryCardStyles.headerBalanceValue}>
            {formatCurrency(balance, true)}
          </Text>
        </View>
        {/* Botão Extrato */}
        <TouchableOpacity
          style={SummaryCardStyles.headerStatementButton}
          onPress={onToGoExtrato}
        >
          <Text style={SummaryCardStyles.headerStatementButtonText}>
            Extrato
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={24}
            color={PRIMARY_BLUE}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SummaryCard;
