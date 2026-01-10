import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TabNavigator } from "./TabNavigator";
import { EmptyStateScreen } from "../screens/home/EmptyStateScreen/EmptyStateScreen";
import { TouchableOpacity, View } from "react-native";
import { LIGHT_BLUE, PRIMARY_BLUE } from "../utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import TransactionDetailsScreen from "../screens/Transactions/TransactionsDetails/TransactionsDetails";

const Stack = createStackNavigator();

interface AppNavigatorProps {
  initialRouteName?: string;
}

export const AppNavigator: React.FC<AppNavigatorProps> = ({
  initialRouteName = "MainTabs",
}) => {
  const navigation = useNavigation<any>();
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="EmptyState">
        {(props) => (
          <EmptyStateScreen
            onGoHome={() => {
              props.navigation.replace("MainTabs");
            }}
            onAddTransaction={() => {
              props.navigation.replace("MainTabs", { screen: "Add" });
            }}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen
        name="TransactionDetails"
        component={TransactionDetailsScreen}
        options={{
          headerShown: true,
          headerTitle: "Detalhes da Transação",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={28} color="#1D3557" />
            </TouchableOpacity>
          ),
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: LIGHT_BLUE,
          },
          headerTitleStyle: {
            fontFamily: "Poppins_600SemiBold",
            fontSize: 20,
            fontWeight: "bold",
            color: PRIMARY_BLUE,
            textAlign: "center",
          },
        }}
      />
    </Stack.Navigator>
  );
};
