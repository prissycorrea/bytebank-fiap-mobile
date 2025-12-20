export type ITransaction = {
  id: string;
  userId: string;
  transactionType: TransactionType;
  price: number;
  createdAt?: string;
  description?: string;
  category: string;
}

export enum TransactionTypeEnum {
  INCOME = "Receita",
  EXPENSE = "Despesa",
};

export type TransactionType = keyof typeof TransactionTypeEnum;