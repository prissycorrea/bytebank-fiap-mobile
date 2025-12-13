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
import { auth } from "./config";

interface IAuthContext {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => ({ success: false }),
  signUp: async () => ({ success: false }),
  logout: () =>
    console.error("A função de logout foi chamada fora do AuthProvider."),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_user) => {
      setUser(_user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("AuthProvider :: login - usuário logado com sucesso");
      return { success: true };
    } catch (error: any) {
      console.log("AuthProvider :: login - falha ao logar usuário", error);
      
      let errorMessage = "E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.";
      
      if (error?.code) {
        switch (error.code) {
          case "auth/user-not-found":
            errorMessage = "E-mail não encontrado. Verifique se o e-mail está correto ou cadastre-se.";
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
          default:
            errorMessage = `Erro ao fazer login: ${error.message || "Erro desconhecido"}`;
        }
      }
      
      return { success: false, error: errorMessage };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("AuthProvider :: signUp - usuário cadastrado com sucesso");
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
      await signOut(auth);
      console.log("AuthProvider :: logout - usuário deslogado com sucesso");
    } catch (error) {
      console.log("AuthProvider :: logout - erro ao deslogar", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
