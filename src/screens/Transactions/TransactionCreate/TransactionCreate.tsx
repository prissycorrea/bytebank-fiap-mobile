import React, { useState, useCallback } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Animated,
  ActionSheetIOS,
  Alert,
  Modal,
  Image,
} from "react-native";
import { TransactionCreateStyle } from "./TransactionCreate.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DANGER,
  LIGHT_BLUE,
  PRIMARY_BLUE,
  SUCCESS,
} from "../../../utils/colors";
import { RegisterScreenStyles } from "../../auth/RegisterScreen/RegisterScreen.styles";
import AutocompleteCategories from "../../../components/forms/AutocompleteCategories/AutocompleteCategories";
import { createTransaction, uploadFile } from "../../../services/transactions";
import { useAuth } from "../../../services/firebase/auth";
import { TransactionType } from "../../../types/transaction";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SuccessScreen } from "../../auth";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const TransactionCreate: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  // Estados do formulário
  const [transactionType, setTransactionType] =
    useState<TransactionType>("INCOME");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);

  // Valor animado (0 = Income, 1 = Expense)
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
      useNativeDriver: false,
    }).start();
  }, [transactionType]);

  React.useEffect(() => {
    const checkPendingResult = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result = await ImagePicker.getPendingResultAsync();

      console.log("useEffect: ", result);

      if (
        result &&
        "assets" in result &&
        result.assets &&
        result.assets.length > 0
      ) {
        setImage(result.assets[0].uri);
        console.log("Recuperado do cache do Android:", result.assets[0].uri);
      }
    };
    checkPendingResult();
  }, []);

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const backgroundColor = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [SUCCESS, DANGER],
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
        category: categoriaSelecionada.nome,
        attachmentUrl: imageUrl,
      });

      setIsSuccess(true);
    } catch (error: any) {
      if (error.serverResponse) {
        console.log("RESPOSTA DO SERVIDOR:", error.serverResponse);
      }
      console.error("Erro completo:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setPrice("");
    setDescription("");
    setImage(null);
    setCategoriaSelecionada(null);
    setTransactionType("INCOME");
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <SuccessScreen
        successProps={{ title: "Sucesso!" }}
        onAddMore={resetForm}
        onGoHome={() => navigation.navigate("Home" as never)}
      />
    );
  }

  const salvarCategoria = (categoria: any) => {
    setCategoriaSelecionada(categoria);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 0.1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
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
          data={[]}
          renderItem={null}
          showsVerticalScrollIndicator={false}

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
                <Text style={TransactionCreateStyle.labelInput}>
                  Valor <Text style={{ color: "red" }}>*</Text>
                </Text>
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
                <Text style={TransactionCreateStyle.labelInput}>
                  Categoria <Text style={{ color: "red" }}>*</Text>
                </Text>
                <AutocompleteCategories
                  aoSelecionar={salvarCategoria}
                ></AutocompleteCategories>
              </View>

              {/* 1. O Botão que abre o Menu */}
              <View style={TransactionCreateStyle.mainInput}>
                <Text style={TransactionCreateStyle.labelInput}>
                  Comprovante
                </Text>

                {image ? (
                  <View
                    style={{
                      width: "100%",
                      position: "relative",
                      padding: 10,
                      backgroundColor: "#FFF",
                      borderRadius: 10,
                    }}
                  >
                    {/* Botão de Remover */}
                    <TouchableOpacity
                      onPress={removeImage}
                      style={{
                        position: "absolute",
                        top: -20,
                        right: 9,
                        zIndex: 10,
                        backgroundColor: "#FFFFFF",
                        borderWidth: 3,
                        borderColor: LIGHT_BLUE,
                        borderRadius: 100,
                        padding: 4,
                        elevation: 5,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="close"
                        size={24}
                        color={PRIMARY_BLUE}
                      />
                    </TouchableOpacity>

                    {/* Preview da Imagem */}
                    <Image
                      source={{ uri: image }}
                      style={{
                        width: "100%",
                        height: 200,
                        borderRadius: 10,
                      }}
                      resizeMode="cover"
                    />
                  </View>
                ) : (
                  <TouchableOpacity
                    style={[
                      RegisterScreenStyles.input,
                      { justifyContent: "center" },
                    ]}
                    onPress={() => setModalVisible(true)}
                  >
                    <Text style={{ color: "#999" }}>
                      + Clique para anexar foto
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* 2. O Modal que funciona como Bottom Sheet */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    justifyContent: "flex-end",
                  }}
                >
                  {/* Toque fora para fechar */}
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => setModalVisible(false)}
                  />

                  <View
                    style={{
                      backgroundColor: "white",
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      padding: 20,
                      paddingBottom: 40,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginBottom: 5,
                        color: "#333",
                      }}
                    >
                      Selecionar Comprovante
                    </Text>
                    <Text style={{ color: "#666", marginBottom: 20 }}>
                      Escolha uma opção:
                    </Text>

                    {/* Opção Galeria */}
                    <TouchableOpacity
                      style={TransactionCreateStyle.anexoOption}
                      onPress={() => {
                        pickImage();
                        setModalVisible(false);
                      }}
                    >
                      <Text style={{ fontSize: 20, marginRight: 15 }}>🖼️</Text>
                      <Text style={{ fontSize: 16, color: "#333" }}>
                        Escolher da Galeria
                      </Text>
                    </TouchableOpacity>

                    {/* Botão Cancelar */}
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      style={{ marginTop: 10, padding: 10 }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#E74C3C",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Cancelar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

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
          ListFooterComponent={
            <View style={{ height: 100, backgroundColor: LIGHT_BLUE }} />
          }
        ></FlatList>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TransactionCreate;
