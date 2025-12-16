import React from "react";
import { FlatList, Text, View } from "react-native";
import TransactionItem from "../../../components/common/TransactionItem/TransactionItem";
import { TransactionWidgetStyles } from "./TransactionWidget.styles";
import { ITransaction } from "../../../types/transaction";

const TransactionWiget: React.FC<{
  title: string;
  redirect: string;
  transactions: ITransaction[];
}> = ({ title, redirect, transactions }) => {
  return (
    <View style={TransactionWidgetStyles.container}>
      <View style={TransactionWidgetStyles.header}>
        <Text style={TransactionWidgetStyles.title}>{title}</Text>
        <Text style={TransactionWidgetStyles.redirect}>{redirect}</Text>
      </View>
      <FlatList
        data={transactions}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 16 }} // Espaçamento entre os cards
      />
    </View>
  );
};

export default TransactionWiget;
