import { IUser } from "../types/user";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firabaseConfigAuth } from "./firebase/config";

const db = getFirestore(firabaseConfigAuth.app);

export const getUserInfo = async (userId: string): Promise<IUser | null> => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as IUser;
    }
    return null;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    return null;
  }
};
