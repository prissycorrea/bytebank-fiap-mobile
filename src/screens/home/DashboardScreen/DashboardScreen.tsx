import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SectionList,
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
import FinancialCard, {
  FinancialCardProps,
} from "../../../components/common/FinancialCard/FinancialCard";
import { useAuth } from "../../../services/firebase/auth";
import {
  getBalance,
  getMyTransactions,
  getSummary,
} from "../../../services/transactions";
import { ITransaction } from "../../../types/transaction";
import { formatCurrency } from "../../../utils/formatters";
import TransactionItem from "../../../components/common/TransactionItem/TransactionItem";
import TransactionWiget from "../../Transactions/TransactionWidget/TransactionWidget";
import { TransactionWidgetStyles } from "../../Transactions/TransactionWidget/TransactionWidget.styles";

type SectionData = {
  title: string;
  data: ITransaction[];
};

const DashboardScreen: React.FC = () => {
  const { user, userData } = useAuth();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [summaryList, setSummaryList] = useState<FinancialCardProps[]>([]);
  const sections = [
    {
      title: "Últimas transações",
      data: transactions,
    },
  ];
  const renderSectionHeader = ({
    section: { title },
  }: {
    section: SectionData;
  }) => (
    <View style={DashboardScreenStyles.transactionSection}>
      <Text style={DashboardScreenStyles.titleSection}>{title}</Text>
      <Text style={DashboardScreenStyles.redirectSection}>Ver todas</Text>
    </View>
  );

  useEffect(() => {
    if (user) {
      getMyTransactions(user?.uid).then((transactions) =>
        setTransactions(transactions)
      );

      getBalance(user?.uid).then((balance) => setBalance(balance));

      getSummary(user?.uid).then((summary) => setSummaryList(summary));
    }
  }, [user]);
  return (
    <LinearGradient
      colors={[PRIMARY_BLUE, SECONDARY_BLUE]}
      style={DashboardScreenStyles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SectionList<ITransaction, SectionData>
        sections={sections}
        ListHeaderComponent={
          <>
            {/* 1. HEADER E SALDO */}
            <SummaryCard
              name={userData?.name || "Usuário"}
              balance={formatCurrency(balance)}
            />
            {/* 2. CARTÕES FINANCEIROS */}
            <FinancialCard items={summaryList} />
          </>
        }
        renderSectionHeader={renderSectionHeader}
        renderItem={({ item }) => (
          <View style={TransactionWidgetStyles.container}>
            <TransactionItem transaction={item} />
          </View>
        )}
        stickySectionHeadersEnabled={true}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }} // Espaço para não cortar o último item
        showsVerticalScrollIndicator={false}
      ></SectionList>
    </LinearGradient>
  );
};

export default DashboardScreen;
