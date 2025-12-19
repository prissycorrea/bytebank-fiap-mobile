import { StyleSheet } from "react-native";
import { GRAY_DARK, LIGHT_BLUE } from "../../../utils/colors";

const DashboardScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  transactionSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25,
    marginBlockStart: 25,
    borderTopStartRadius: 28,
    borderTopEndRadius: 28,
    backgroundColor: LIGHT_BLUE,
    marginTop: -1,
    borderBottomWidth: 0, // <--- Força a remoção de qualquer linha
    elevation: 0, // <--- Remove sombra no Android
    shadowOpacity: 0, // <--- Remove sombra no iOS
  },
  titleSection: {
    fontSize: 16,
    fontWeight: "900",
    color: GRAY_DARK,
  },
  redirectSection: {
    fontSize: 12,
    letterSpacing: 1.5,
  },
});

export default DashboardScreenStyles;
