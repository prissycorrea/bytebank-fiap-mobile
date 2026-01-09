import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DashboardScreen from "../screens/home/DashboardScreen/DashboardScreen";
import {
  BLUE_SKY,
  GRAY_DARK,
  GRAY_LIGHT,
  LIGHT_BLUE,
  PRIMARY_BLUE,
  WHITE,
} from "../utils/colors";
import TransactionCreate from "../screens/Transactions/TransactionCreate/TransactionCreate";
import TransactionList from "../screens/Transactions/TransactionList/TransactionList";

const Tab = createBottomTabNavigator();
const Placeholder = () => (
  <View style={{ flex: 1, backgroundColor: "#F0F4F8" }} />
);
export const TabNavigator = () => {
  const inserts = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        // 1. Forçamos o estilo do container de cada aba
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          height: 40, // Alinhado com a altura da sua tabBar
          paddingTop: 0,
          paddingBottom: 0,
        },

        // // 2. Garantimos que o estilo do label (mesmo oculto) não ocupe espaço
        tabBarLabelStyle: {
          marginBottom: 0,
          paddingBottom: 0,
          display: "none", // Força o sumiço do label no motor de renderização
        },

        // 3. Estilo da barra
        tabBarStyle: [
          styles.tabBar,
          {
            bottom: inserts.bottom > 0 ? inserts.bottom : 20,
          },
        ],
      }}
    >
      <Tab.Screen
        name="Add"
        component={TransactionCreate}
        options={({ navigation }: any) => ({
          headerShown: true,
          headerTitle: "Adicionar Transação",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={() => navigation.navigate("Home")} // Volta para a aba Home
            >
              <Ionicons name="chevron-back" size={28} color="#1D3557" />
            </TouchableOpacity>
          ),
          headerStyle: {
            elevation: 0, // Remove sombra no Android
            shadowOpacity: 0, // Remove sombra no iOS
            borderBottomWidth: 0, // Remove linha no iOS
            backgroundColor: LIGHT_BLUE,
          },
          headerTitleStyle: {
            fontFamily: "Poppins_600SemiBold", // Usa a fonte que você já carregou
            fontSize: 20,
            fontWeight: "bold",
            color: PRIMARY_BLUE,
            textAlign: "center",
          },
          tabBarIcon: () => (
            <View style={styles.plusButton}>
              <Ionicons name="add" size={30} color="white" />
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-sharp"
              size={24}
              color={focused ? PRIMARY_BLUE : GRAY_LIGHT}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Transactions"
        component={TransactionList}
        options={({ navigation }: any) => ({
          headerShown: true,
          headerTitle: "Transações",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={() => navigation.navigate("Home")} // Volta para a aba Home
            >
              <Ionicons name="chevron-back" size={28} color="#1D3557" />
            </TouchableOpacity>
          ),
          headerStyle: {
            elevation: 0, // Remove sombra no Android
            shadowOpacity: 0, // Remove sombra no iOS
            borderBottomWidth: 0, // Remove linha no iOS
            backgroundColor: LIGHT_BLUE,
          },
          headerTitleStyle: {
            fontFamily: "Poppins_600SemiBold", // Usa a fonte que você já carregou
            fontSize: 20,
            fontWeight: "bold",
            color: PRIMARY_BLUE,
            textAlign: "center",
          },
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="swap-horizontal"
              size={28}
              color={focused ? PRIMARY_BLUE : GRAY_LIGHT}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: 64,
    marginHorizontal:100,
    left: "15%",
    right: "15%",
    borderRadius: 35,
    backgroundColor: WHITE,
    borderTopWidth: 0,

    // ALINHAMENTO INTERNO MANUAL
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around", // Distribui os ícones igualmente
    paddingBottom: 0,

    // Sombras...
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  plusButton: {
    width: 52,
    height: 52,
    backgroundColor: BLUE_SKY,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
