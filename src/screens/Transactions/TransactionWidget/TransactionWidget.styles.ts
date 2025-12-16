import { StyleSheet } from "react-native";
import { GRAY_DARK, LIGHT_BLUE } from "../../../components/layout/Colors";

export const TransactionWidgetStyles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        paddingInline: 25,
        paddingBlockEnd: 25,
        backgroundColor: LIGHT_BLUE,
    },
})