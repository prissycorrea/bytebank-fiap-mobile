import React, { useState, useCallback } from "react";
import { View, Text, FlatList, RefreshControl, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../../services/firebase/auth";
import TransactionItem from "../../../components/common/TransactionItem/TransactionItem";
import { ITransaction } from "../../../types/transaction";
import { TransactionCreateStyle } from "../TransactionCreate/TransactionCreate.styles";
import { RegisterScreenStyles } from "../../auth/RegisterScreen/RegisterScreen.styles";
import { LIGHT_BLUE } from "../../../utils/colors";
import { useFocusEffect } from "@react-navigation/native";
import { getMyTransactions } from "../../../services/transactions";

const TransactionListScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  useFocusEffect(
    useCallback(() => {
      if (user) {
        getMyTransactions(user!.uid).then(setTransactions);
      }
    }, [user])
  );

  // Função de Pull-to-Refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await getMyTransactions(user!.uid).then(setTransactions);
    setRefreshing(false);
  };

  // Filtro de busca local (opcional)
  const filteredTransactions = transactions.filter(
    (t) =>
      t.description?.toLowerCase().includes(searchText.toLowerCase()) ||
      t.category.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View
      style={[TransactionCreateStyle.container, { paddingTop: insets.top }]}
    >
      {/* Header e Barra de Busca conforme seu layout */}
      <View style={TransactionCreateStyle.mainInput}>
        <TextInput
          style={RegisterScreenStyles.input}
          placeholder="Buscar transação"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false} // Oculta a barra de rolagem
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={{
            marginBlockEnd: 20,
          }}>
            <TransactionItem transaction={item} />
          </View>
        )}
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
      />
    </View>
  );
};

export default TransactionListScreen;
