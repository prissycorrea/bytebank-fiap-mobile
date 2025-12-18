import { StyleSheet } from "react-native";
import { GRAY_DARK, LIGHT_BLUE, PRIMARY_BLUE, SECONDARY_BLUE, SUCCESS, WHITE } from "../../../utils/colors";

export const SummaryCardStyles = StyleSheet.create({
  headerContainer: {
    // backgroundColor: PRIMARY_BLUE,
    padding: 30,
    paddingBlock: 40,
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
    marginLeft: 10,
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
    color: GRAY_DARK,
    fontSize: 14,
  },
  headerBalanceValue: {
    color: WHITE,
    fontSize: 26,
    fontWeight: "bold",
  },
});
