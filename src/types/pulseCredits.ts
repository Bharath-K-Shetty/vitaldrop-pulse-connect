
export interface CreditTransaction {
  id: number;
  amount: number;
  type: 'received' | 'sent' | 'earned';
  fromOrTo?: string;
  date: string;
  message?: string;
}
