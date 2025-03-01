import { useState } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface Order {
  id: number;
  user: string;
  amount: string;
  status: string;
  createdAt: string;
}

interface AdminSectionProps {
  title: string;
  data: User[] | Order[];
  type: 'users' | 'orders' | 'completedOrders';
}

export function AdminSection({ title, data, type }: AdminSectionProps) {
  const [visibleItems, setVisibleItems] = useState(5);

  const handleShowMore = () => {
    setVisibleItems(prevVisible => prevVisible + 5);
  };

  const handleDeleteItem = (id: number) => {
    // Implement delete functionality here
    console.log(`Delete item with id: ${id}`);
  };

  const renderTableHeaders = () => {
    if (type === 'users') {
      return (
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      );
    } else {
      return (
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      );
    }
  };

  const renderTableRow = (item: User | Order) => {
    if (type === 'users') {
      const user = item as User;
      return (
        <TableRow key={user.id}>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.createdAt}</TableCell>
          <TableCell>
            <div className="flex space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">Edit</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>Make changes to the user account here.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">Name</Label>
                      <Input id="name" value={user.name} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">Email</Label>
                      <Input id="email" value={user.email} className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(user.id)}>Delete</Button>
            </div>
          </TableCell>
        </TableRow>
      );
    } else {
      const order = item as Order;
      return (
        <TableRow key={order.id}>
          <TableCell>{order.user}</TableCell>
          <TableCell>{order.amount}</TableCell>
          <TableCell>{order.status}</TableCell>
          <TableCell>{order.createdAt}</TableCell>
          <TableCell>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Confirm</Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">Payment Proof</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Payment Proof</DialogTitle>
                    <DialogDescription>View or upload payment proof for this order.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="proof" className="text-right">Upload Proof</Label>
                      <Input id="proof" type="file" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Upload</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(order.id)}>Delete</Button>
            </div>
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Table>
        <TableHeader>
          {renderTableHeaders()}
        </TableHeader>
        <TableBody>
          {data.slice(0, visibleItems).map(renderTableRow)}
        </TableBody>
      </Table>
      {visibleItems < data.length && (
        <div className="flex justify-center">
          <Button onClick={handleShowMore}>Show More</Button>
        </div>
      )}
    </div>
  );
}

