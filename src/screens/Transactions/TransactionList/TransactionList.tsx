import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../../services/firebase/auth";
import TransactionItem from "../../../components/common/TransactionItem/TransactionItem";
import { ITransaction } from "../../../types/transaction";
import { TransactionCreateStyle } from "../TransactionCreate/TransactionCreate.styles";
import { RegisterScreenStyles } from "../../auth/RegisterScreen/RegisterScreen.styles";
import { LIGHT_BLUE } from "../../../utils/colors";
import { useFocusEffect } from "@react-navigation/native";
import { getMyTransactions } from "../../../services/transactions";
import { normalize } from "../../../utils";

const TransactionListScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const categoriasUsadas = [...new Set(transactions.map((t) => t.category))];
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

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
  // Filtro de busca local Combinado (Texto + Chip)
  const filteredTransactions = transactions.filter((t) => {
    // Se o filtro for vazio ou "Todas", ele ignora essa parte.
    // Caso contrário, verifica se a categoria é exatamente a do chip.
    const matchesCategory =
      categoriaFiltro === "" || t.category === categoriaFiltro;

    const matchesSearch =
      t.description?.toLowerCase().includes(searchText.toLowerCase()) ||
      t.category.toLowerCase().includes(searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const ListHeader = () => {
    return (
      <>
        <View style={TransactionCreateStyle.mainInput}>
          <TextInput
            style={RegisterScreenStyles.input}
            placeholder="Buscar transação"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            autoCapitalize="words"
          />
        </View>

        <FlatList
          horizontal
          data={categoriasUsadas}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const isSelected = item === categoriaFiltro;
            return (
              <TouchableOpacity
                style={{
                  borderColor: isSelected ? "#009BE9" : "#0F2C59",
                  backgroundColor: isSelected ? "#009BE9" : "transparent", // Opcional: destaque de fundo
                  borderWidth: 1,
                  borderRadius: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  marginRight: 10,
                  marginBottom: 25,
                }}
                onPress={() => {
                  // Se clicar no mesmo, desmarca. Se não, marca o novo.
                  setCategoriaFiltro(isSelected ? "" : item);
                }}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </>
    );
  };

  return (
    <View
      style={[TransactionCreateStyle.container, { paddingTop: insets.top }]}
    >
      {/* Header e Barra de Busca conforme seu layout */}

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false} // Oculta a barra de rolagem
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View
            style={{
              marginBlockEnd: 20,
            }}
          >
            <TransactionItem transaction={item} />
          </View>
        )}
        ListHeaderComponent={<ListHeader />}
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
