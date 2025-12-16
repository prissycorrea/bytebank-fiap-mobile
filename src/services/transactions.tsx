import {
  collection,
  doc,
  getDocs,
  getFirestore,
  increment,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { firabaseConfigAuth } from "./firebase/config";
import { ITransaction, TransactionType } from "../types/transaction";
import { FinancialCardProps } from "../components/common/FinancialCard/FinancialCard";
import { formatCurrency } from "../utils/formatters";

const db = getFirestore(firabaseConfigAuth.app);
const collectionRef = collection(db, "transactions");

export const getMyTransactions = async (
  userId: string
): Promise<ITransaction[]> => {
  // Lógica para buscar transações do usuário no Firestore
  try {
    const q = query(collectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const transactions: ITransaction[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ITransaction[];

    return transactions;
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

    // ==========================================================
    // 1. CRIAR A TRANSAÇÃO
    // ==========================================================
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

    // ==========================================================
    // 2. ATUALIZAR SALDO GERAL (User)
    // ==========================================================
    const userRef = doc(db, "users", userId);
    batch.update(userRef, {
      balance: increment(newTransaction.price),
    });

    // ==========================================================
    // 3. ATUALIZAR RESUMO MENSAL (Monthly Summary)
    // ==========================================================
    // Estratégia: Criamos uma subcoleção dentro do usuário para ficar organizado
    // Caminho: users/{userId}/monthly_summaries/{2025_10}

    const monthId = getMonthId(newTransaction.createdAt!);
    const summaryRef = doc(db, "users", userId, "monthly_summaries", monthId);

    // Define qual campo atualizar baseando-se se é receita (+) ou despesa (-)
    const isExpense = newTransaction.price < 0;
    const fieldToUpdate = isExpense ? "totalExpenses" : "totalIncome";

    // Usamos set com { merge: true } porque o documento do mês pode não existir ainda.
    // O increment funciona perfeitamente com set+merge.
    batch.set(
      summaryRef,
      {
        monthId: monthId, // Útil para ordenação depois
        [fieldToUpdate]: increment(Math.abs(newTransaction.price)), // Somamos sempre positivo aqui para exibição
      },
      { merge: true }
    );

    // ==========================================================
    // 4. COMMIT FINAL
    // ==========================================================
    await batch.commit();
    console.log("Transação, Saldo e Resumo Mensal atualizados!");
  } catch (error) {
    console.error("Erro no batch:", error);
    throw error;
  }
};

export const getBalance = async (userId: string): Promise<number> => {
  try {
    const transactions = await getMyTransactions(userId);
    const balance = transactions.reduce((acc, transaction) => {
      return transaction.transactionType === "INCOME"
        ? acc + transaction.price
        : acc - transaction.price;
    }, 0);
    return balance;
  } catch (error) {
    console.error("Erro ao calcular saldo:", error);
    return 0;
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
    const balance = await getBalance(userId);

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
        label: "Saldo",
        value: formatCurrency(balance),
      },
    ];
  } catch (error) {
    console.error("Erro ao calcular resumo financeiro:", error);
    return [];
  }
};

// Helper para pegar o ID do mês (ex: "2025_10")
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
  const currentMonth = now.getMonth(); // 9 (Outubro, pois começa do 0)
  const currentYear = now.getFullYear(); // 2025

  return transactions.filter((item) => {
    // O JavaScript converte a string ISO para Objeto Date automaticamente aqui
    const itemDate = new Date(item.createdAt!);

    // Verificações
    const isExpense = item.transactionType === type;
    const isSameMonth = itemDate.getMonth() === currentMonth;
    const isSameYear = itemDate.getFullYear() === currentYear;

    return isExpense && isSameMonth && isSameYear;
  });
};
