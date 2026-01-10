import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseConfigAuth } from "./config";
import { IUser } from '../../types/user';

interface IAuthContext {
  user: User | null;
  userData: IUser | null;
  login: (auth: Omit<IUser, 'name'>) => Promise<{ success: boolean; error?: string }>;
  signUp: (register: IUser) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  userData: null,
  isAuthenticated: false,
  loading: true,
  login: async () => ({ success: false }),
  signUp: async () => ({ success: false }),
  logout: () =>
    console.error("A função de logout foi chamada fora do AuthProvider."),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseConfigAuth, async (_user) => {
      setUser(_user);

      if (_user) {
        try {
          const db = getFirestore(firebaseConfigAuth.app);
          const docRef = doc(db, 'users', _user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data() as IUser);
          }
        } catch (error) {
          console.log("Erro ao buscar dados do usuário no Firestore", error);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (user: Omit<IUser, 'name'>) => {
    try {
      await signInWithEmailAndPassword(firebaseConfigAuth, user.email, user.password);
      console.log("AuthProvider :: login - usuário logado com sucesso");
      return { success: true };
    } catch (error: any) {
      console.log("AuthProvider :: login - falha ao logar usuário", error);
      console.log("AuthProvider :: login - código do erro:", error?.code);
      console.log("AuthProvider :: login - mensagem do erro:", error?.message);

      let errorMessage = "E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.";

      const errorCode = error?.code || error?.errorCode || (error?.message?.includes('auth/') ? error.message.split('auth/')[1]?.split(')')[0] : null);
      const errorMessageText = error?.message || '';

      if (errorMessageText.toLowerCase().includes('user-not-found') || 
          errorMessageText.toLowerCase().includes('there is no user record')) {
        errorMessage = "Este e-mail não está cadastrado. Que tal criar uma conta? Clique em 'Cadastre-se' abaixo.";
      } else if (errorCode) {
        const normalizedCode = errorCode.startsWith('auth/') ? errorCode : `auth/${errorCode}`;
        
        switch (normalizedCode) {
          case "auth/user-not-found":
            errorMessage = "Este e-mail não está cadastrado. Que tal criar uma conta? Clique em 'Cadastre-se' abaixo.";
            break;
          case "auth/wrong-password":
            errorMessage = "Senha incorreta. Tente novamente.";
            break;
          case "auth/invalid-email":
            errorMessage = "O e-mail informado é inválido. Verifique e tente novamente.";
            break;
          case "auth/user-disabled":
            errorMessage = "Esta conta foi desabilitada. Entre em contato com o suporte.";
            break;
          case "auth/network-request-failed":
            errorMessage = "Erro de conexão. Verifique sua internet e tente novamente.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Muitas tentativas de login. Tente novamente mais tarde.";
            break;
          case "auth/invalid-credential":
            errorMessage = "E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.";
            break;
          default:
            errorMessage = "E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.";
        }
      }

      return { success: false, error: errorMessage };
    }
  };

  const signUp = async (userData: IUser) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseConfigAuth, userData.email, userData.password);
      const uid = userCredential.user.uid;

      const db = getFirestore(firebaseConfigAuth.app);

      await setDoc(doc(db, 'users', uid), {
        name: userData.name,
        email: userData.email,
        createdAt: new Date().toISOString(),
      });
      console.log('Usuário cadastrado e dados salvos no banco!');

      return { success: true };
    } catch (error: any) {
      console.log("AuthProvider :: signUp - falha", error);

      let errorMessage = "Não foi possível criar sua conta. Tente novamente mais tarde.";

      if (error?.code) {
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "Este e-mail já está cadastrado. Tente fazer login ou use outro e-mail.";
            break;
          case "auth/invalid-email":
            errorMessage = "O e-mail informado é inválido. Verifique e tente novamente.";
            break;
          case "auth/weak-password":
            errorMessage = "A senha é muito fraca. Use uma senha com pelo menos 6 caracteres.";
            break;
          case "auth/network-request-failed":
            errorMessage = "Erro de conexão. Verifique sua internet e tente novamente.";
            break;
          case "auth/operation-not-allowed":
            errorMessage = "Operação não permitida. Entre em contato com o suporte.";
            break;
          default:
            errorMessage = `Erro ao criar conta: ${error.message || "Erro desconhecido"}`;
        }
      }

      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await signOut(firebaseConfigAuth);
      console.log("AuthProvider :: logout - usuário deslogado com sucesso");
    } catch (error) {
      console.log("AuthProvider :: logout - erro ao deslogar", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        login,
        signUp,
        logout,
        isAuthenticated: !!user,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
