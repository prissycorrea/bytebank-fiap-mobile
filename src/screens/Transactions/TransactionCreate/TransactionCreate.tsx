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
  ActionSheetIOS,
  Alert,
  Modal,
  Button,
  Image,
  Linking,
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
  const [isSuccess, setIsSuccess] = useState(false); // Estado para a tela de sucesso
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

  React.useEffect(() => {
    const checkPendingResult = async () => {
      // Pequena pausa para garantir que o sistema liberou o arquivo
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result = await ImagePicker.getPendingResultAsync();

      console.log("useEffect: ", result);

      // Verificamos se o resultado existe e se ele NÃO é um erro (checando se existe 'assets')
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

  // Interpolações para transformar 0->1 em estilos
  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"], // Aproximação: assume que o container ~200px width e o botão ~100px.
    // Melhor seria usar porcentagem se o layout permitir: ['0%', '100%']
    // Vamos tentar porcentagem que é o que o código original (reanimated) parecia usar ("100%")
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
        category: categoriaSelecionada.nome, // Certifique-se de salvar a string ou objeto conforme seu banco
        attachmentUrl: imageUrl,
      });

      setIsSuccess(true); // Ativa a tela de sucesso após criar
    } catch (error: any) {
      // Isso vai mostrar exatamente o que o Firebase respondeu
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

  const takePhoto = async () => {
    try {
      // Pede permissão de Câmera e Galeria (necessário para o Android salvar o temporário)
      const cameraPerm = await ImagePicker.requestCameraPermissionsAsync();
      const libraryPerm =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (cameraPerm.status !== "granted" || libraryPerm.status !== "granted") {
        Alert.alert(
          "Permissão Necessária",
          "Precisamos de acesso à câmera e galeria para anexar fotos.",
          [
            {
              text: "Abrir Configurações",
              onPress: () => Linking.openSettings(),
            },
            { text: "Cancelar" },
          ]
        );
        return;
      }

      // DISPARO REAL DA CÂMERA (estava faltando no seu código)
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: "images",
        quality: 0.1,
      });

      console.log("Resultado da Câmera:", result);

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao abrir a câmera:", error);
      alert("Não foi possível abrir a câmera.");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 0.1, // Reduz qualidade para o upload ser mais rápido
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const showImageOptions = () => {
    const options = ["Tirar Foto", "Escolher da Galeria", "Cancelar"];
    const cancelButtonIndex = 2;

    if (Platform.OS === "ios") {
      // No iOS usa o visual nativo de baixo
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
          title: "Selecionar Comprovante",
        },
        (buttonIndex) => {
          if (buttonIndex === 0) takePhoto();
          else if (buttonIndex === 1) pickImage();
        }
      );
    } else {
      // No Android o padrão é um Alert centralizado ou você pode usar o ActionSheet
      // mas o Alert.alert com botões é o mais comum e estável nativamente
      Alert.alert(
        "Selecionar Comprovante",
        "Escolha uma opção:",
        [
          { text: "📸 Tirar Foto", onPress: takePhoto },
          { text: "🖼️ Galeria", onPress: pickImage },
          { text: "Cancelar", style: "cancel" },
        ],
        { cancelable: true }
      );
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
                        top: -20, // Ajustado para flutuar um pouco mais sobre a borda
                        right: 9,
                        zIndex: 10,
                        backgroundColor: "#FFFFFF",
                        borderWidth: 3, // 5 pode ficar muito grosso, 3 costuma ser o ideal
                        borderColor: "#E3F2FD", // Substitua pelo seu LIGHT_BLUE
                        borderRadius: 100,
                        padding: 4,
                        elevation: 5, // Sombra para o Android
                        shadowColor: "#000", // Sombra para o iOS
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
                    ]} // Use seu estilo aqui
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
                    backgroundColor: "rgba(0,0,0,0.5)", // Escurece o fundo
                    justifyContent: "flex-end", // Empurra o conteúdo para baixo
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
                        pickImage(); // Sua função da galeria
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
