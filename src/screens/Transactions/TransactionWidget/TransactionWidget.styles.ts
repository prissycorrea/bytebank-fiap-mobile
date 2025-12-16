import { StyleSheet } from "react-native";
import { GRAY_DARK, LIGHT_BLUE } from "../../../components/layout/Colors";

export const TransactionWidgetStyles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 25,
        padding: 25,
        borderTopStartRadius: 28,
        borderTopEndRadius: 28,
        backgroundColor: LIGHT_BLUE,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "900",
        color: GRAY_DARK
    },
    redirect: {
        fontSize: 12,
        
    }
})