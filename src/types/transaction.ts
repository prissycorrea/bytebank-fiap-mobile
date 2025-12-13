export type ITransaction = {
  id: string;
  userId: string;
  transactionType: TransactionType;
  price: number;
  createdAt: Date;
  description?: string;
}

export enum TransactionTypeEnum {
  INCOME = "Receita",
  EXPENSE = "Despesa",
};

export type TransactionType = keyof typeof TransactionTypeEnum;