// src/services/firebase/config.ts
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Cole a configuração do seu projeto Firebase aqui
// Substitua este objeto pelo que você copiou do Console do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAjxCYkYthJNdrIA-KXQd84y0CcOZfwNrc",
  authDomain: "appbytebankfiap.firebaseapp.com",
  projectId: "appbytebankfiap",
  storageBucket: "appbytebankfiap.appspot.com",
  messagingSenderId: "858565132840",
  appId: "1:858565132840:web:312b02c2a3f872c2da6b1d"
};

// Teste de Sanidade: Isso vai garantir que o arquivo está sendo lido.
if (!firebaseConfig.apiKey) {
  throw new Error("Chave de API do Firebase não encontrada no arquivo de configuração.");
}

const app = initializeApp(firebaseConfig);
export const firabaseConfigAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
