export type CreditCard = {
  id: string;
  name: string;
  limit: number;
  closingDay: number;
  dueDay: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  image:string | null;
  availableLimit :number
}; 