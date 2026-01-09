import React, { useState, useCallback } from "react";
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
  Animated,
} from "react-native";
import { TransactionCreateStyle } from "./TransactionCreate.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { DANGER, SUCCESS } from "../../../utils/colors";
import { RegisterScreenStyles } from "../../auth/RegisterScreen/RegisterScreen.styles";
import AutocompleteCategories from "../../../components/forms/AutocompleteCategories/AutocompleteCategories";
import { createTransaction, uploadFile } from "../../../services/transactions";
import { useAuth } from "../../../services/firebase/auth";
import { TransactionType } from "../../../types/transaction";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SuccessScreen } from "../../auth";
import * as ImagePicker from "expo-image-picker";

const TransactionCreate: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // Estado para a tela de sucesso
  const navigation = useNavigation();

  // Estados do formulário
  const [transactionType, setTransactionType] =
    useState<TransactionType>("INCOME");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);

  // Valor animado (0 = Income, 1 = Expense)
  // Usamos useRef para persistir o valor entre renderizações
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  // Lógica para resetar os campos sempre que a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      setIsSuccess(false);
      setPrice("");
      setDescription("");
      setCategoriaSelecionada(null);
      setTransactionType("INCOME");
      // Resetar animação
      slideAnim.setValue(0);
    }, [])
  );

  // Dispara a animação quando o tipo muda
  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: transactionType === "INCOME" ? 0 : 1,
      duration: 250,
      useNativeDriver: false, // Necessário false para width/color em algumas versões ou layouts complexos
    }).start();
  }, [transactionType]);

  // Interpolações para transformar 0->1 em estilos
  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Aproximação: assume que o container ~200px width e o botão ~100px.
    // Melhor seria usar porcentagem se o layout permitir: ['0%', '100%']
    // Vamos tentar porcentagem que é o que o código original (reanimated) parecia usar ("100%")
    outputRange: ['0%', '100%']
  });

  const backgroundColor = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [SUCCESS, DANGER]
  });

  const animatedStyle = {
    transform: [{ translateX }],
    backgroundColor,
  };

  const handleTransactionCreate = async () => {
    if (!price || !categoriaSelecionada) {
      alert("Por favor, preencha o valor e a categoria.");
      return;
    }

    try {
      setLoading(true);
      let imageUrl = "";

      if (image) {
        imageUrl = await uploadFile(image, user!.uid);
      }
      await createTransaction(user!.uid, {
        transactionType: transactionType,
        price:
          transactionType === "INCOME" ? parseFloat(price) : -parseFloat(price),
        description,
        category: categoriaSelecionada.nome, // Certifique-se de salvar a string ou objeto conforme seu banco
        attachmentUrl: imageUrl,
      });

      setIsSuccess(true); // Ativa a tela de sucesso após criar
    } catch (error) {
      console.error("Erro ao criar transação:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPrice("");
    setDescription("");
    setCategoriaSelecionada(null);
    setTransactionType("INCOME");
    setIsSuccess(false); // Isso faz o formulário reaparecer
  };

  // Se estiver em modo de sucesso, renderiza a SuccessScreen
  if (isSuccess) {
    return (
      <SuccessScreen
        successProps={{ title: "Sucesso!" }}
        onAddMore={resetForm} // Reseta isSuccess e o useFocusEffect limpa o resto
        onGoHome={() => navigation.navigate("Home" as never)}
      />
    );
  }

  const salvarCategoria = (categoria: any) => {
    setCategoriaSelecionada(categoria); // Agora o pai tem o dado!
  };

  // Função para selecionar a imagem
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5, // Reduz qualidade para o upload ser mais rápido
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
                <AutocompleteCategories
                  aoSelecionar={salvarCategoria}
                ></AutocompleteCategories>
              </View>

              <View style={TransactionCreateStyle.mainInput}>
                <Text style={TransactionCreateStyle.labelInput}>
                  Comprovante
                </Text>
                <TouchableOpacity
                  style={[
                    RegisterScreenStyles.input,
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      borderStyle: "dashed",
                      borderWidth: 2,
                    },
                  ]}
                  onPress={pickImage}
                >
                  {image ? (
                    <Text style={{ color: SUCCESS }}>✓ Imagem selecionada</Text>
                  ) : (
                    <Text style={{ color: "#999" }}>
                      + Clique para anexar foto
                    </Text>
                  )}
                </TouchableOpacity>
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
