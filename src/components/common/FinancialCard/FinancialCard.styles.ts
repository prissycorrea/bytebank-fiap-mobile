import { BLACK, BLUE_SKY, GRAY_LIGHT, LIGHT_BLUE, LIGHT_BLUE_TRANSPARENT, LIGHTER_BLUE, SUCCESS, WHITE } from "../../../utils/colors";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

// Você quer 2 itens inteiros + 1 fatia (0.3) visível.
// Largura da tela / 2.3 = largura de cada slide
const SLIDE_WIDTH = width / 2.5;

export const FinancialCardStyles = {
  container: {
    paddingInlineStart: 16,
  },
  card: {
    flex: 1,
    backgroundColor: LIGHT_BLUE_TRANSPARENT,
    borderRadius: 25,
    padding: 16,
    minWidth: SLIDE_WIDTH,
    // Garante que o container do FlatList tenha uma altura definida para renderizar
    // height: 96,
  },
  slide: {
    // ESSENCIAL: Garante que cada item ocupe a largura da tela
    width: width,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  dotsContainer: {
    flexDirection: "row", // Alinha os dots horizontalmente
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: BLACK, // Dot preto quando ativo
  },
  inactiveDot: {
    backgroundColor: GRAY_LIGHT, // Dot cinza quando inativo
    opacity: 0.5,
  },
  headerBalanceLabel: {
    fontSize: 12,
    color: LIGHTER_BLUE,
    marginBlock: 5,
  },
  headerBalanceValue: {
    fontSize: 18,
    color: WHITE,
  },
  income: {
    color: BLUE_SKY,
  },
  expense: {
    color: WHITE,
  },
  balance: {
    color:SUCCESS,
  },
};
