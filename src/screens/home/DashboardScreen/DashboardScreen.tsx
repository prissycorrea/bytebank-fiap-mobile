import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SectionList,
  StatusBar,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import DashboardScreenStyles from "./Dashboard.styles";
import { LinearGradient } from "expo-linear-gradient";
import {
  PRIMARY_BLUE,
  SECONDARY_BLUE,
  LIGHT_BLUE,
  BLUE_SKY,
} from "../../../utils/colors";
import SummaryCard from "../../../components/common/SummaryCard/SummaryCard";
import FinancialCard, {
  FinancialCardProps,
} from "../../../components/common/FinancialCard/FinancialCard";
import { useAuth } from "../../../services/firebase/auth";
import {
  getMonthlySummaries,
  getMyTransactions,
  getSummary,
} from "../../../services/transactions";
import { ITransaction } from "../../../types/transaction";
import TransactionItem from "../../../components/common/TransactionItem/TransactionItem";
import { TransactionWidgetStyles } from "../../Transactions/TransactionWidget/TransactionWidget.styles";
import ChartsWidget from "../../../components/layout/Charts/ChartsWidget";
import { getUserInfo } from "../../../services/users";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { stackDataItem } from "react-native-gifted-charts";

type SectionData = {
  title: string;
  data: ITransaction[];
};

const DashboardScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const currentMonthIndex = new Date().getMonth();

  const { user } = useAuth();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [name, setName] = useState<string>("Usuário");
  const [summaryList, setSummaryList] = useState<FinancialCardProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [monthlySummaries, setMonthlySummaries] = useState<stackDataItem[]>([]);

  const navigation = useNavigation();

  const sections = [
    {
      title: "Últimas transações",
      data: transactions,
    },
  ];

  const onRefresh = useCallback(async () => {
    if (!user) return;

    setRefreshing(true);

    try {
      await Promise.all([
        getMyTransactions(user.uid).then(setTransactions),
        getSummary(user.uid).then(setSummaryList),
        getUserInfo(user.uid).then((userData) => {
          setBalance(userData?.balance || 0);
          setName(userData?.name || "Usuário");
        }),
        getMonthlySummaries(user?.uid).then((monthlySummaries) => {
          setMonthlySummaries(
            monthlySummaries.map((item, index) => ({
              ...item,
              labelTextStyle:
                index === currentMonthIndex
                  ? {
                      color: BLUE_SKY,
                      fontWeight: "bold",
                      marginLeft: -18,
                      textAlign: "center",
                    }
                  : undefined,
            }))
          );
        }),
      ]);
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    } finally {
      setRefreshing(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      getUserInfo(user.uid).then((userData) => {
        setName(userData?.name || "Usuário");
      });
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        getMyTransactions(user!.uid).then(setTransactions);
        getSummary(user!.uid).then(setSummaryList);
        getUserInfo(user.uid).then((userData) => {
          setBalance(userData?.balance || 0);
          setName(userData?.name || "Usuário");
        });
        getMonthlySummaries(user?.uid).then((monthlySummaries) => {
          setMonthlySummaries(
            monthlySummaries.map((item, index) => ({
              ...item,
              labelTextStyle:
                index === currentMonthIndex
                  ? {
                      color: BLUE_SKY,
                      fontWeight: "bold",
                      marginLeft: -18,
                      textAlign: "center",
                    }
                  : undefined,
            }))
          );
        });
      }
    }, [])
  );

  const renderSectionHeader = ({ section }: { section: SectionData }) => (
    <View
      style={{
        backgroundColor: LIGHT_BLUE,
        paddingTop: 1,
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
          <Text
            style={DashboardScreenStyles.redirectSection}
            onPress={onToGoExtrato}
          >
            Ver todas
          </Text>
        )}
      </View>
    </View>
  );

  const onToGoExtrato = () => {
    navigation.navigate("Transactions" as never);
  };

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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFF"
            colors={[PRIMARY_BLUE]}
          />
        }
        ListHeaderComponent={
          <View style={{ paddingTop: insets.top + 20, paddingBottom: 20 }}>
            {/* 1. HEADER E SALDO */}
            <SummaryCard name={name} balance={balance} />
            {/* 2. GRAFICO MENSAL */}
            <ChartsWidget monthlySummaries={monthlySummaries} />
            {/* 2. CARTÕES FINANCEIROS */}
            <FinancialCard items={summaryList} />
          </View>
        }
        renderSectionHeader={renderSectionHeader}
        ListEmptyComponent={
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
        }
        renderItem={({ item }) => (
          <View style={[TransactionWidgetStyles.container]}>
            <TransactionItem transaction={item} />
          </View>
        )}
        stickySectionHeadersEnabled={true}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={{ height: 100, backgroundColor: LIGHT_BLUE }} />
        }
      />
    </LinearGradient>
  );
};

export default DashboardScreen;
