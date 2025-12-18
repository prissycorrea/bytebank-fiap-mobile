import React, { useEffect, useState } from "react";
import { View, Text, SectionList, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DashboardScreenStyles from "./Dashboard.styles";
import { LinearGradient } from "expo-linear-gradient";
import {
  PRIMARY_BLUE,
  SECONDARY_BLUE,
} from "../../../utils/colors";
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
import { TransactionWidgetStyles } from "../../Transactions/TransactionWidget/TransactionWidget.styles";
import ChartsWidget from "../../../components/layout/Charts/ChartsWidget";

type SectionData = {
  title: string;
  data: ITransaction[];
};

const DashboardScreen: React.FC = () => {
  // 1. Hook para pegar a altura da barra de status (ex: 47px no iPhone)
  const insets = useSafeAreaInsets();

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

  // 2. Lógica de busca de dados (Mantida igual)
  useEffect(() => {
    if (user) {
      getMyTransactions(user?.uid).then((transactions) =>
        setTransactions(transactions)
      );
      getBalance(user?.uid).then((balance) => setBalance(balance));
      getSummary(user?.uid).then((summary) => setSummaryList(summary));
    }
  }, [user]);

  // 3. O Pulo do Gato: Header com Padding Dinâmico
  const renderSectionHeader = ({
    section: { title },
  }: {
    section: SectionData;
  }) => (
    <View
      style={{
        // backgroundColor: PRIMARY_BLUE, // Cor de fundo para "tapar" a lista rolando
        // paddingTop: insets.top, // O espaço exato do relógio/notch
        // Z-index garante que fique acima da lista
        zIndex: 10,
      }}
    >
      {/* O container visual branco (Seu estilo original) */}
      <View style={DashboardScreenStyles.transactionSection}>
        <Text style={DashboardScreenStyles.titleSection}>{title}</Text>
        <Text style={DashboardScreenStyles.redirectSection}>Ver todas</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={[PRIMARY_BLUE, SECONDARY_BLUE]}
      style={DashboardScreenStyles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Garante que o gradiente apareça atrás do relógio */}
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <SectionList<ITransaction, SectionData>
        sections={sections}
        // 4. Header da Lista com Padding para não começar escondido
        ListHeaderComponent={
          <View style={{ paddingTop: insets.top + 20, paddingBottom: 20 }}>
            {/* 1. HEADER E SALDO */}
            <SummaryCard
              name={userData?.name || "Usuário"}
              balance={formatCurrency(balance)}
            />
            {/* 2. GRAFICO MENSAL */}
            <ChartsWidget />
            {/* 2. CARTÕES FINANCEIROS */}
            <FinancialCard items={summaryList} />
          </View>
        }
        renderSectionHeader={renderSectionHeader}
        // 5. Item da lista com fundo branco/gelo para continuidade
        renderItem={({ item }) => (
          // Dica: Adicione backgroundColor no estilo desse container se ainda estiver transparente
          <View style={[TransactionWidgetStyles.container]}>
            <TransactionItem transaction={item} />
          </View>
        )}
        stickySectionHeadersEnabled={true}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

export default DashboardScreen;
