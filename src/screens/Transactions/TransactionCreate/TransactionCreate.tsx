import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { TransactionCreateStyle } from "./TransactionCreate.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { DANGER, SUCCESS } from "../../../utils/colors";
import { RegisterScreenStyles } from "../../auth/RegisterScreen/RegisterScreen.styles";
import AutocompleteCategories from "../../../components/forms/AutocompleteCategories/AutocompleteCategories";
import { createTransaction } from "../../../services/transactions";
import { useAuth } from "../../../services/firebase/auth";
import { TransactionType } from "../../../types/transaction";

const TransactionCreate: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>("INCOME");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");

  const handleTransactionCreate = async () => {
    try {
      setLoading(true);
      // Lógica de criação da transação aqui
      createTransaction(user!.uid, {
        transactionType: transactionType,
        price: parseFloat(price),
        description,
        category: categoriaSelecionada
      });
    } catch (error) {
      console.error("Erro ao criar transação:", error);
    } finally {
      setLoading(false);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(transactionType === "INCOME" ? 0 : "100%", {
            duration: 250,
          }),
        },
      ],
      // Opcional: mudar a cor se for despesa (ex: vermelho)
      backgroundColor: withTiming(
        transactionType === "INCOME" ? SUCCESS : DANGER
      ),
    };
  });

  const salvarCategoria = (categoria: any) => {
    console.log("Recebido do filho:", categoria);
    setCategoriaSelecionada(categoria); // Agora o pai tem o dado!
  };

  return (
    <SafeAreaView style={TransactionCreateStyle.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <FlatList
          data={[]} // Lista vazia
          renderItem={null}
          ListHeaderComponent={
            <>
              <View style={TransactionCreateStyle.mainInput}>
                <Text style={TransactionCreateStyle.labelInput}>
                  Tipo de Transação
                </Text>

                <View style={TransactionCreateStyle.toggleSwitchContainer}>
                  {/* Fundo animado que desliza */}
                  <Animated.View
                    style={[
                      TransactionCreateStyle.toggleSwitchActiveIndicator,
                      animatedStyle,
                    ]}
                  />

                  <Pressable
                    style={TransactionCreateStyle.toggleSwitchOption}
                    onPress={() => setTransactionType("INCOME")}
                  >
                    <Text
                      style={[
                        TransactionCreateStyle.toggleSwitchOptionText,
                        transactionType === "INCOME" &&
                          TransactionCreateStyle.toggleSwitchActiveText,
                      ]}
                    >
                      Receita
                    </Text>
                  </Pressable>

                  <Pressable
                    style={TransactionCreateStyle.toggleSwitchOption}
                    onPress={() => setTransactionType("EXPENSE")}
                  >
                    <Text
                      style={[
                        TransactionCreateStyle.toggleSwitchOptionText,
                        transactionType === "EXPENSE" &&
                          TransactionCreateStyle.toggleSwitchActiveText,
                      ]}
                    >
                      Despesa
                    </Text>
                  </Pressable>
                </View>
              </View>

              <View style={TransactionCreateStyle.mainInput}>
                <Text style={TransactionCreateStyle.labelInput}>Valor</Text>
                <TextInput
                  style={RegisterScreenStyles.input}
                  placeholder="R$ 0,00"
                  placeholderTextColor="#999"
                  value={price}
                  keyboardType="numeric"
                  onChangeText={setPrice}
                />
              </View>

              <View style={TransactionCreateStyle.mainInput}>
                <Text style={TransactionCreateStyle.labelInput}>Descrição</Text>
                <TextInput
                  style={RegisterScreenStyles.input}
                  placeholder="Ex.: Compras no supermercado"
                  placeholderTextColor="#999"
                  value={description}
                  onChangeText={setDescription}
                  autoCapitalize="words"
                />
              </View>

              <View style={TransactionCreateStyle.mainInput}>
                <Text style={TransactionCreateStyle.labelInput}>Categoria</Text>
                <AutocompleteCategories aoSelecionar={salvarCategoria}></AutocompleteCategories>
              </View>

              <TouchableOpacity
                style={[
                  RegisterScreenStyles.registerButton,
                  loading && RegisterScreenStyles.registerButtonDisabled,
                ]}
                onPress={handleTransactionCreate}
                activeOpacity={0.8}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={RegisterScreenStyles.registerButtonText}>
                    Cadastrar
                  </Text>
                )}
              </TouchableOpacity>
            </>
          }
        ></FlatList>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TransactionCreate;

//
