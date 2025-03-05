import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const withdrawals = [
  { id: 1, date: '2023-06-01', amount: 100, status: 'Completed' },
  { id: 2, date: '2023-06-15', amount: 250, status: 'Pending' },
  { id: 3, date: '2023-07-01', amount: 500, status: 'Completed' },
]

export function WithdrawHistory() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-orange-500">Withdrawal History</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawals.map((withdrawal) => (
            <TableRow key={withdrawal.id}>
              <TableCell>{withdrawal.date}</TableCell>
              <TableCell>${withdrawal.amount}</TableCell>
              <TableCell>{withdrawal.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

