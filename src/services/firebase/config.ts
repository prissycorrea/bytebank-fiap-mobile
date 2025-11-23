// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getReactNativePersistence, initializeAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjxCYkYthJNdrIA-KXQd84y0CcOZfwNrc", // ATENÇÃO: Considere usar variáveis de ambiente
  authDomain: "appbytebankfiap.firebaseapp.com",
  projectId: "appbytebankfiap",
  storageBucket: "appbytebankfiap.appspot.com",
  messagingSenderId: "858565132840",
  appId: "1:858565132840:web:312b02c2a3f872c2da6b1d",
  measurementId: "G-M0752VE2WL",
};

// Inicializa o Firebase App (se ainda não foi inicializado)
const app: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

// Inicializa o Firebase Auth com persistência para React Native
const auth: Auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };
