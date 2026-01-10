import {
  addDoc,
  doc,
  getDoc,
  getFirestore,
  increment,
  where,
  writeBatch,
} from "firebase/firestore";
import { db, app } from "./firebase/config";
import { ITransaction, TransactionType } from "../types/transaction";
import { FinancialCardProps } from "../components/common/FinancialCard/FinancialCard";
import { formatCurrency } from "../utils/formatters";
import { stackDataItem } from "react-native-gifted-charts";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { BLUE_SKY, WHITE } from "../utils/colors";
import { getUserInfo } from "./users";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

const storage = getStorage(app);
const collectionRef = collection(db, "transactions");
const categoriasParaSubir = [
  { nome: "Alimentação", busca: "alimentacao" },
  { nome: "Aluguel", busca: "aluguel" },
  { nome: "Assinaturas e Serviços", busca: "assinaturas e servicos" },
  { nome: "Casa", busca: "casa" },
  { nome: "Compras", busca: "compras" },
  { nome: "Cuidados Pessoais", busca: "cuidados pessoais" },
  { nome: "Educação", busca: "educacao" },
  { nome: "Empréstimos", busca: "emprestimos" },
  { nome: "Entretenimento", busca: "entretenimento" },
  { nome: "Esportes", busca: "esportes" },
  { nome: "Investimentos", busca: "investimentos" },
  { nome: "Lazer", busca: "lazer" },
  { nome: "Mercado", busca: "mercado" },
  { nome: "Outros", busca: "outros" },
  { nome: "Presentes", busca: "presentes" },
  { nome: "Salário", busca: "salario" },
  { nome: "Saúde", busca: "saude" },
  { nome: "Trabalho Extra", busca: "trabalho extra" },
  { nome: "Transporte", busca: "transporte" },
  { nome: "Viagens", busca: "viagens" },
];

export const getMyTransactions = async (
  userId: string
): Promise<ITransaction[]> => {
  try {
    const q = query(collectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const transactions: ITransaction[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ITransaction[];

    return transactions.sort(
      (a, b) =>
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    return [];
  }
};

type CreateTransactionInput = Omit<ITransaction, "id" | "userId">;

export const createTransaction = async (
  userId: string,
  transaction: CreateTransactionInput
): Promise<void> => {
  try {
    const batch = writeBatch(db);

    const newTransaction = {
      ...transaction,
      userId: userId,
      createdAt: new Date().toISOString(),
    };
    const newTransactionRef = doc(collectionRef);
    batch.set(newTransactionRef, {
      ...newTransaction,
      id: newTransactionRef.id,
    });

    const userRef = doc(db, "users", userId);
    batch.update(userRef, {
      balance: increment(newTransaction.price),
    });

    const monthId = getMonthId(newTransaction.createdAt!);
    const summaryRef = doc(db, "users", userId, "monthly_summaries", monthId);

    const isExpense = newTransaction.price < 0;
    const fieldToUpdate = isExpense ? "totalExpenses" : "totalIncome";
    batch.set(
      summaryRef,
      {
        monthId: monthId,
        [fieldToUpdate]: increment(newTransaction.price),
      },
      { merge: true }
    );

    await batch.commit();
    console.log("Transação, Saldo e Resumo Mensal atualizados!");
  } catch (error) {
    console.error("Erro no batch:", error);
    throw error;
  }
};

export const getTransactionById = async (
  id: string
): Promise<ITransaction | null> => {
  try {
    // 1. Cria uma referência para o documento específico dentro da coleção "transactions"
    const docRef = doc(db, "transactions", id);

    // 2. Executa a busca
    const docSnap = await getDoc(docRef);

    // 3. Verifica se o documento existe
    if (docSnap.exists()) {
      // Retornamos os dados formatados com o ID incluso
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as ITransaction;
    } else {
      console.warn("Nenhuma transação encontrada com o ID:", id);
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar transação por ID:", error);
    throw error;
  }
};

export const getSummary = async (
  userId: string
): Promise<FinancialCardProps[]> => {
  try {
    const transactions = await getMyTransactions(userId);
    const income = getDataCurrentMonth(transactions, "INCOME").reduce(
      (acc, transaction) => acc + transaction.price,
      0
    );
    const expense = getDataCurrentMonth(transactions, "EXPENSE").reduce(
      (acc, transaction) => acc + transaction.price,
      0
    );
    const balance = await getUserInfo(userId);

    return [
      {
        type: "income",
        label: "Receitas",
        value: formatCurrency(income),
      },
      {
        type: "expense",
        label: "Despesas",
        value: formatCurrency(expense),
      },
      {
        type: "balance",
        label: "Balanço",
        value: formatCurrency(balance?.balance || 0),
      },
    ];
  } catch (error) {
    console.error("Erro ao calcular resumo financeiro:", error);
    return [];
  }
};

export const getMonthlySummaries = async (userId: string) => {
  try {
    const summariesRef = collection(db, "users", userId, "monthly_summaries");
    const q = query(summariesRef, orderBy("__name__", "asc"));

    const querySnapshot = await getDocs(q);

    const formattedData: stackDataItem[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const docId = doc.id;

      const label = formatMonthLabel(docId);

      return {
        label: label,
        stacks: [
          {
            value: data.totalExpenses || 0,
            color: WHITE,
            marginBottom: 2,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          },
          {
            value: data.totalIncome || 0,
            color: BLUE_SKY,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        ],
      };
    });

    return formattedData;
  } catch (error) {
    console.error("Erro ao buscar resumos no Firebase:", error);
    return [];
  }
};

export const generateCategoriesList = async () => {
  try {
    const colRef = collection(db, "categories");
    for (const cat of categoriasParaSubir) {
      await addDoc(colRef, cat);
    }
    alert("Categorias adicionadas!");
  } catch (e) {
    console.error("Erro ao subir dados: ", e);
  }
};

export const uploadFile = async (
  uri: string,
  userId: string
): Promise<string> => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const fileRef = ref(storage, `comprovantes/${userId}/${Date.now()}.jpg`);

    const uploadResult = await uploadBytes(fileRef, blob, {
      contentType: "image/jpeg",
    });

    const downloadUrl = await getDownloadURL(uploadResult.ref);

    return downloadUrl;
  } catch (error) {
    console.error("Erro detalhado no uploadFile:", error);
    throw error;
  }
};

const formatMonthLabel = (docId: string) => {
  const months = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  const monthIndex = parseInt(docId.split("_")[1]) - 1;
  return months[monthIndex] || docId;
};

const getMonthId = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}_${month}`;
};

const getDataCurrentMonth = (
  transactions: ITransaction[],
  type: TransactionType
): ITransaction[] => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return transactions.filter((item) => {
    const itemDate = new Date(item.createdAt!);

    const isExpense = item.transactionType === type;
    const isSameMonth = itemDate.getMonth() === currentMonth;
    const isSameYear = itemDate.getFullYear() === currentYear;

    return isExpense && isSameMonth && isSameYear;
  });
};

export const deleteAllTransactions = async (userId: string): Promise<void> => {
  try {
    const q = query(collectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const batch = writeBatch(db);

    querySnapshot.docs.forEach((docSnap) => {
      batch.delete(docSnap.ref);
    });

    const userRef = doc(db, "users", userId);
    batch.update(userRef, {
      balance: 0,
    });

    await batch.commit();
    console.log("Todas as transações foram deletadas e o saldo zerado.");
  } catch (error) {
    console.error("Erro ao deletar transações:", error);
    throw error;
  }
};
