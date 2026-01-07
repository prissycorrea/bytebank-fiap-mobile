import { StyleSheet } from "react-native";
import { GRAY_DARK, GRAY_LIGHT, LIGHT_BLUE, PRIMARY_BLUE, SECONDARY_BLUE, SUCCESS, WHITE } from "../../../utils/colors";

export const SummaryCardStyles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: PRIMARY_BLUE,
    padding: 24,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerProfile: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: LIGHT_BLUE,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
  },
  headerAvatarIcon: {
    color: PRIMARY_BLUE,
    fontSize: 40,
    marginBlockEnd: -5,
  },
  headerGreeting: {
    fontSize: 30,
    fontWeight: "400",
    color: WHITE,
    marginLeft: 15,
  },
  headerStatementButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: SUCCESS,
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 50,
  },
  headerStatementButtonText: {
    color: PRIMARY_BLUE,
    fontWeight: "bold",
    marginRight: 10,
  },
  headerBalanceLabel: {
    color: GRAY_LIGHT,
    fontSize: 14,
  },
  headerBalanceValue: {
    color: WHITE,
    fontSize: 26,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 60,
    paddingRight: 24,
  },
  menuContainer: {
    backgroundColor: WHITE,
    borderRadius: 12,
    padding: 8,
    minWidth: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  menuItemText: {
    fontSize: 16,
    color: GRAY_DARK,
    marginLeft: 12,
    fontWeight: "500",
  },
});
