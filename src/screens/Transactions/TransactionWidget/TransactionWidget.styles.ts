import { StyleSheet } from "react-native";
import { GRAY_DARK, LIGHT_BLUE } from "../../../utils/colors";

export const TransactionWidgetStyles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        paddingInline: 25,
        paddingBlockEnd: 25,
        backgroundColor: LIGHT_BLUE,
    },
})