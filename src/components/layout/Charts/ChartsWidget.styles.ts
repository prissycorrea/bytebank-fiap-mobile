import { StyleSheet } from "react-native";
import { LIGHT_BLUE } from "../../../utils/colors";

export const ChartsWidgetStyles = StyleSheet.create({
  noData: {
    backgroundColor: LIGHT_BLUE,
    padding: 20,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
