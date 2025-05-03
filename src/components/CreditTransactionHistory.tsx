
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Heart, Send, Receive } from "lucide-react";
import { CreditTransaction } from "@/types/pulseCredits";

interface CreditTransactionHistoryProps {
  transactions: CreditTransaction[];
  className?: string;
}

const CreditTransactionHistory = ({ transactions, className }: CreditTransactionHistoryProps) => {
  const [visibleTransactions, setVisibleTransactions] = useState(3);
  
  const showMoreTransactions = () => {
    setVisibleTransactions(prev => Math.min(prev + 3, transactions.length));
  };

  return (
    <div className={`mt-4 ${className}`}>
      <h3 className="text-sm font-medium mb-2">Recent Transactions</h3>
      
      {transactions.length === 0 ? (
        <p className="text-sm text-gray-500 py-2">No recent transactions</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.slice(0, visibleTransactions).map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-red-50">
                  <TableCell>
                    <div className={`p-2 rounded-full 
                      ${transaction.type === 'received' ? 'bg-green-100' : 
                        transaction.type === 'sent' ? 'bg-red-100' : 'bg-blue-100'}`}>
                      {transaction.type === 'received' ? (
                        <Receive className="h-4 w-4 text-green-600" />
                      ) : transaction.type === 'sent' ? (
                        <Send className="h-4 w-4 text-red-600" />
                      ) : (
                        <Heart className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-sm">
                      {transaction.type === 'received' 
                        ? `Received from ${transaction.fromOrTo}` 
                        : transaction.type === 'sent' 
                          ? `Sent to ${transaction.fromOrTo}`
                          : 'Earned from donation'}
                    </div>
                    <div className="text-xs text-gray-500">{transaction.date}</div>
                    {transaction.message && (
                      <div className="text-xs italic mt-1">"{transaction.message}"</div>
                    )}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${
                    transaction.type === 'received' || transaction.type === 'earned' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {transaction.type === 'received' || transaction.type === 'earned' 
                      ? `+${transaction.amount}` 
                      : `-${transaction.amount}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {visibleTransactions < transactions.length && (
            <div className="text-center mt-2">
              <Button 
                variant="link" 
                size="sm" 
                onClick={showMoreTransactions}
                className="text-primary hover:text-primary/80"
              >
                Show more
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CreditTransactionHistory;
