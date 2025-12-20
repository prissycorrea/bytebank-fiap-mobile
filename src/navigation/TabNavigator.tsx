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
  PRIMARY_BLUE,
  WHITE,
} from "../utils/colors";

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
        component={Placeholder}
        options={{
          headerShown: true,
          headerTitle: "Adicionar Transação",
          tabBarIcon: () => (
            <View style={styles.plusButton}>
              <Ionicons name="add" size={30} color="white" />
            </View>
          ),
        }}
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
        name="Exchange"
        component={Placeholder}
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
            backgroundColor: "transparent",
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
    marginHorizontal: 100,
    borderRadius: 35,
    backgroundColor: WHITE,
    borderTopWidth: 0,
    // Sombra para Android
    elevation: 8,
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
