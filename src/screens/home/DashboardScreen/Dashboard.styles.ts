import { StyleSheet } from "react-native";
import { GRAY_DARK, LIGHT_BLUE } from "../../../components/layout/Colors";

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
