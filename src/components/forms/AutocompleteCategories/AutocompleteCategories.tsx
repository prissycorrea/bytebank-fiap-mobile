import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { firabaseConfigAuth } from "../../../services/firebase/config";
import { RegisterScreenStyles } from "../../../screens/auth/RegisterScreen/RegisterScreen.styles";

const db = getFirestore(firabaseConfigAuth.app);
const collectionRef = collection(db, "categories");

const AutocompleteCategories = ({ aoSelecionar }: any) => {
  const [query, setQuery] = useState("");
  const [dadosFull, setDadosFull] = useState<any>([]); // Lista original do Firebase
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [showList, setShowList] = useState(false);

  // 1. Busca os dados do Firebase ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collectionRef);
      const lista = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDadosFull(lista);
    };
    fetchData();
  }, []);

  // 2. Função de Filtro (Autocomplete)
  const handleSearch = (text: any) => {
    setQuery(text);
    if (text.length > 0) {
      const filtrados = dadosFull.filter((item: any) =>
        item.nome.toLowerCase().includes(text.toLowerCase())
      );
      setDadosFiltrados(filtrados);
      setShowList(true);
    } else {
      setShowList(false);
    }
  };

  // 3. Selecionar item da lista
  const selecionarItem = (item: any) => {
    setQuery(item.nome);
    setShowList(false);
    aoSelecionar(item);
  };

  return (
    <>
        <TextInput
          style={RegisterScreenStyles.input}
          placeholder="Selecione uma categoria"
          placeholderTextColor="#999"
          value={query}
          onChangeText={handleSearch}
          onFocus={() => query.length > 0 && setShowList(true)}
          autoCapitalize="words"
        />

      {showList && (
        <View style={styles.dropdown}>
          <FlatList
          nestedScrollEnabled={true}
            data={dadosFiltrados}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => selecionarItem(item)}
              >
                <Text>{item.nome}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    maxHeight: 200,
    borderRadius: 8,
    marginTop: 2,
    elevation: 3, // Sombra no Android
    shadowColor: "#000", // Sombra no iOS
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default AutocompleteCategories;
