import React, { useEffect, useState } from "react";
import { View, Text, SectionList, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


import DashboardScreenStyles from "./Dashboard.styles";
import { LinearGradient } from "expo-linear-gradient";
import {
  PRIMARY_BLUE,
  SECONDARY_BLUE,
  LIGHT_BLUE,
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





  if (!user) {
    return <View style={{ flex: 1, backgroundColor: PRIMARY_BLUE }} />; // Loading state simples
  }

  // Se não houver transações e já tiver carregado (assumindo que empty array + user logado = vazio)
  // Idealmente teríamos um loading state explícito, mas usando transactions.length === 0 por enquanto


  // 3. O Pulo do Gato: Header com Padding Dinâmico
  const renderSectionHeader = ({ section }: { section: SectionData }) => (
    <View
      style={{
        backgroundColor: LIGHT_BLUE, // Cor de fundo para "tapar" a lista rolando
        paddingTop: 1, // O espaço exato do relógio/notch
        borderTopRightRadius: 28,
        borderTopLeftRadius: 28,
      }}
    >
      <View
        style={[
          DashboardScreenStyles.transactionSection,
          section.data.length === 0 && {
            backgroundColor: LIGHT_BLUE,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        ]}
      >
        <Text style={DashboardScreenStyles.titleSection}>{section.title}</Text>
        {section.data.length > 0 && (
          <Text style={DashboardScreenStyles.redirectSection}>Ver todas</Text>
        )}
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
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <SectionList<ITransaction, SectionData>
        sections={sections}
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
        renderSectionFooter={({ section }) => {
          if (section.data.length === 0) {
            return (
              <View
                style={{
                  backgroundColor: LIGHT_BLUE,
                  padding: 20,
                  alignItems: "center",
                  borderBottomLeftRadius: 24,
                  borderBottomRightRadius: 24,
                  marginBottom: 24,
                }}
              >
                <Text style={{ fontFamily: "Poppins_400Regular" }}>
                  Não há transações para exibir.
                </Text>
              </View>
            );
          }
          return <View style={{ paddingBottom: 45, backgroundColor: LIGHT_BLUE }}></View>;
        }}
        // 5. Item da lista com fundo branco/gelo para continuidade
        renderItem={({ item }) => (
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
