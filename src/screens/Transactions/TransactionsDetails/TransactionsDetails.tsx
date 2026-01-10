import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { ITransaction } from "../../../types/transaction";
import { getTransactionById } from "../../../services/transactions";
import { BLUE_SKY, LIGHT_BLUE } from "../../../utils/colors";
import { formatCurrency, formatDate } from "../../../utils/formatters";

const TransactionDetailsScreen: React.FC = () => {
  const route = useRoute();
  const { transactionId } = route.params as { transactionId: string };

  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState<ITransaction | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);
        // Busca os dados atualizados usando o ID
        const data = await getTransactionById(transactionId);
        setTransaction(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [transactionId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#009BE9" />
      </View>
    );
  }

  if (!transaction) return <Text>Transação não encontrada.</Text>;

  return (
    <ScrollView style={TransactionDetailsStyles.container}>
      {/* <View style={TransactionDetailsStyles.card}> */}
        <Text style={TransactionDetailsStyles.label}>Descrição</Text>
        <Text style={TransactionDetailsStyles.value}>
          {transaction.description}
        </Text>

        <View style={TransactionDetailsStyles.divider} />

        <Text style={TransactionDetailsStyles.label}>Data e Hora</Text>
        <Text style={TransactionDetailsStyles.value}>
          {transaction.createdAt}
        </Text>

        <View style={TransactionDetailsStyles.divider} />

        <Text style={TransactionDetailsStyles.label}>Preço</Text>
        <Text style={TransactionDetailsStyles.value}>
          {formatCurrency(transaction.price)}
        </Text>

        <View style={TransactionDetailsStyles.divider} />

        <Text style={TransactionDetailsStyles.label}>Comprovante</Text>
        {transaction.attachmentUrl ? (
          <Image
            source={{ uri: transaction.attachmentUrl }}
            style={TransactionDetailsStyles.receiptImage}
            resizeMode="contain"
          />
        ) : (
          <Text
            style={[
              TransactionDetailsStyles.value,
              { color: "#999", fontStyle: "italic" },
            ]}
          >
            Nenhum comprovante anexado.
          </Text>
        )}
      {/* </View> */}
    </ScrollView>
  );
};

export default TransactionDetailsScreen;

const TransactionDetailsStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: LIGHT_BLUE, padding: 20 },
  card: {
    backgroundColor: "#FFF",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 3, // Sombra Android
    shadowColor: "#000", // Sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  label: {
    fontSize: 12,
    color: "#888",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  value: { fontSize: 16, color: "#333", marginBottom: 16, fontWeight: "500" },
  divider: { height: 1, backgroundColor: "#1D3557", marginBottom: 16 },
  receiptImage: { width: "100%", height: 300, borderRadius: 8, marginTop: 10 },
});
