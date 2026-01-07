import { StyleSheet } from "react-native";
import { GRAY_DARK, LIGHT_BLUE } from "../../../utils/colors";

export const TransactionCreateStyle = StyleSheet.create({
  container: {
    backgroundColor: LIGHT_BLUE,
    padding: 25,
    flex: 1,
  },
  mainInput: {
    paddingBlockEnd: 25,
  },
  labelInput: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A232E",
    marginBottom: 5,
    marginInlineStart: 20,
  },
  toggleSwitchContainer: {
    width: "70%",
    height: 50,
    backgroundColor: "#F0F4F8",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden", // Garante que o seletor não saia das bordas
  },
  toggleSwitchActiveIndicator: {
    position: "absolute",
    width: "50%",
    height: "100%",
    borderRadius: 25,
  },
  toggleSwitchOption: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Fica acima do activeIndicator
  },
  toggleSwitchOptionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#546E7A",
  },
  toggleSwitchActiveText: {
    color: "#FFFFFF",
  },
});
