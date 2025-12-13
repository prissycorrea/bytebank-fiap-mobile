import { FlatList, Text, View } from "react-native";
import { FinancialCardStyles } from "./FinancialCard.styles";
import Ionicons from "@expo/vector-icons/Ionicons";

export type FinancialType = "income" | "expense" | "balance";

export type FinancialCardProps = {
  type: FinancialType;
  label: string;
  value: string;
};

const CarouselItem = (item: FinancialCardProps) => (
  <View style={FinancialCardStyles.card}>
    {CarouselIconType(item.type)}
    <Text style={FinancialCardStyles.headerBalanceLabel}>{item.label}</Text>
    <Text style={FinancialCardStyles.headerBalanceValue}>{item.value}</Text>
  </View>
);

function CarouselIconType(type: FinancialType) {
  switch (type) {
    case "income":
      return <Ionicons name="trending-up-outline" size={24} style={FinancialCardStyles.income} />;
    case "expense":
      return <Ionicons name="trending-down-outline" size={24} style={FinancialCardStyles.expense} />;
    case "balance":
      return <Ionicons name="wallet-outline" size={24} style={FinancialCardStyles.balance} />;
    default:
      break;
  }
}

const FinancialCard: React.FC<{ items: FinancialCardProps[] }> = ({ items }) => {
  return (
    <View style={FinancialCardStyles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CarouselItem {...item} />}
        keyExtractor={(item) => item.type}
        // --- ⚙️ Propriedades Essenciais do Carrossel ---
        horizontal={true} // Rola horizontalmente
        showsHorizontalScrollIndicator={false} // Oculta a barra de rolagem
        // onMomentumScrollEnd={(event) => { /* Opcional: Lógica para saber em qual slide parou */ }}
        // ---------------------------------------------
        contentContainerStyle={{ gap: 16, paddingInlineEnd: 16 }} // Espaçamento entre os cards
      />
    </View>
  );
};

export default FinancialCard;
