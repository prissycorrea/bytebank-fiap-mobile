import React from "react";
import { Text, View } from "react-native";
import { ITransaction } from "../../../types/transaction";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TransactionItemStyles } from "./TransactionItem.styles";
import { formatCurrency } from "../../../utils/formatters";

const TransactionItem: React.FC<{ transaction: ITransaction }> = ({
  transaction,
}) => {
  if (!transaction) {
    return null;
  }

  const isIncome = transaction.transactionType === "INCOME";
  const date = transaction.createdAt ? new Date(transaction.createdAt) : null;
  const formattedDate =
    date && !isNaN(date.getTime()) ? date.toISOString().split("T")[0] : "";

  return (
    <View style={TransactionItemStyles.container}>
        <MaterialCommunityIcons
          style={[
            isIncome
              ? TransactionItemStyles.income
              : TransactionItemStyles.expense,
            TransactionItemStyles.icon
          ]}
          name={isIncome ? "arrow-up-thin" : "arrow-down-thin"}
          size={24}
        />
      <View style={TransactionItemStyles.containerLabel}>
        <Text style={TransactionItemStyles.label}>
          {transaction.description
            ? transaction.description
            : transaction.category}
        </Text>
        <Text style={TransactionItemStyles.date}>{formattedDate}</Text>
      </View>
      <Text style={TransactionItemStyles.price}>{formatCurrency(transaction.price, !isIncome)}</Text>
    </View>
  );
};

export default TransactionItem;
