export type Bill = {
  id: string;
  fixedBillId: string | null; // <- obrigatório, pode ser null
  description: string;
  dueDate: Date;
  amount: number;
  paid: boolean;
  paidAt: Date | null; // <- obrigatório, pode ser null
  transactionId: string | null; // <- obrigatório, pode ser null
  createdAt: Date;
  updatedAt: Date;
};

export type FixedBill = {
  id: string;
  title: string;
  amount: number;
  dueDay: number;
  categoryId?: string;
  userId: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}; 