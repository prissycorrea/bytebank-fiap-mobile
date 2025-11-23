import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
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
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => false,
  signUp: async () => false,
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
      return true;
    } catch (error) {
      console.log("AuthProvider :: login - falha ao logar usuário", error);
      return false;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("AuthProvider :: signUp - usuário cadastrado com sucesso");
      return true;
    } catch (error) {
      console.log("AuthProvider :: signUp - falha", error);
      return false;
    }
  };

  const logout = () => {
    console.log("AuthProvider :: logout - usuário deslogado com sucesso");
    auth.signOut();
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
