import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SafeAreaView from "react-native-safe-area-context";
import DashboardScreenStyles from "./Dashboard.styles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import {
  PRIMARY_BLUE,
  SECONDARY_BLUE,
} from "../../../components/layout/Colors";
import { SummaryCardStyles } from "../../../components/common/SummaryCard/SummaryCard.styles";
import SummaryCard from "../../../components/common/SummaryCard/SummaryCard";

const DashboardScreen: React.FC = () => {
  return (
    <LinearGradient
      colors={[PRIMARY_BLUE, SECONDARY_BLUE]}
      style={DashboardScreenStyles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Garantir que o azul cubra a barra de status */}
      {/* <SafeAreaView style={styles.headerBackground} />  */}
      <ScrollView style={DashboardScreenStyles.container}>
        {/* 1. HEADER E SALDO */}
        <SummaryCard />
      </ScrollView>
    </LinearGradient>
  );
};

export default DashboardScreen;
