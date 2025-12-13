import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
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

export const getSummary = async (userId: string): Promise<FinancialCardProps[]> => {
    try {
      const transactions = await getMyTransactions(userId);
        const income = getDataCurrentMonth(transactions, 'INCOME').reduce((acc, transaction) => acc + transaction.price, 0);
        const expense = getDataCurrentMonth(transactions, 'EXPENSE').reduce((acc, transaction) => acc + transaction.price, 0);
        const balance = await getBalance(userId);
        
        return [{
            type: 'income',
            label: 'Receitas',
            value: formatCurrency(income),
        }, {
            type: 'expense',
            label: 'Despesas',
            value: formatCurrency(expense),
        }, {
            type: 'balance',
            label: 'Saldo',
            value: formatCurrency(balance),
        }]
    } catch (error) {
      console.error("Erro ao calcular resumo financeiro:", error);
      return [];
    }
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
    const itemDate = new Date(item.createdAt);

    // Verificações
    const isExpense = item.transactionType === type;
    const isSameMonth = itemDate.getMonth() === currentMonth;
    const isSameYear = itemDate.getFullYear() === currentYear;

    return isExpense && isSameMonth && isSameYear;
  });
};
