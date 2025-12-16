import { StyleSheet } from "react-native";
import {
  DANGER,
  GRAY_DARK,
  GRAY_LIGHT,
  SUCCESS,
  WHITE,
} from "../../layout/Colors";

export const TransactionItemStyles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    gap: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    paddingBlock: 20,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 20,
    color: WHITE,
    fontSize: 24,
    textAlign: "center",
    verticalAlign: "middle",
  },
  income: {
    backgroundColor: SUCCESS,
  },
  expense: {
    backgroundColor: DANGER,
  },
  containerLabel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  label: {
    fontSize: 14,
    color: GRAY_DARK,
  },
  date: {
    fontSize: 12,
    color: GRAY_LIGHT,
  },
  price: {
    color: GRAY_DARK,
    fontSize: 18,
    fontWeight: "bold",
  },
});
