import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, XCircle, CreditCard, Hash, Shield, LineChart, ChevronDown, User, Wallet } from "lucide-react" 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EditOrderModal } from "@/components/edit-order-modal"
import { OrderDetails, OrderStatus, OrderType, RejectReasons, FailReasons } from "@/types/order"

interface RunningOrder {
  order_id: string
  platform_login: string
  platform_password: string
  server: string
  session_id: string
  terminal_id: string
}

interface User {
  id: number
  username: string
  email: string
  name: string
  country: string
  phone_no: string
  address: string
  createdAt: string
}

const mockOrders: OrderDetails[] = [
  {
    id: 1,
    user: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
    },
    amount: "$1000",
    status: OrderStatus.COMPLETED,
    type: OrderType.STANDARD,
    createdAt: "2023-04-05",
    accountType: "Challenge Phase-1",
    platformType: "MT4",
    platformLogin: "SAA",
    platformPassword: "password123",
    server: "None",
    startingBalance: 5003,
    currentBalance: 5000,
    profitTarget: 400,
    paymentProof: "https://example.com/proof1.jpg",
    paymentMethod: "Credit Card",
    txid: "TXN123456789"
  },
  {
    id: 2,
    user: {
      name: "Jane Smith", 
      email: "jane@example.com",
      phone: "+1987654321",
    },
    amount: "$1500",
    status: OrderStatus.PENDING,
    type: OrderType.STANDARD,
    createdAt: "2023-04-10",
    accountType: "Challenge Phase-2",
    platformType: "MT5",
    platformLogin: "SAB",
    platformPassword: "password456",
    server: "None",
    startingBalance: 10000,
    currentBalance: 11000,
    profitTarget: 800,
    paymentProof: "https://example.com/proof2.jpg",
    paymentMethod: "Bank Transfer",
    txid: "TXN987654321"
  },
]

interface AdminTablesProps {
  selectedSection: "users" | "orders" | "completedOrders" | "failedOrders" | "rejectedOrders" | "runningOrders" | "analytics" | "reports" | null
}

export function AdminTables({ selectedSection }: AdminTablesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [orders, setOrders] = useState(mockOrders)
  const [completedOrders, setCompletedOrders] = useState<OrderDetails[]>([])
  const [failedOrders, setFailedOrders] = useState<OrderDetails[]>([])
  const [rejectedOrders, setRejectedOrders] = useState<OrderDetails[]>([])
  const [runningOrders, setRunningOrders] = useState<RunningOrder[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [editedOrder, setEditedOrder] = useState<OrderDetails | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [viewOrder, setViewOrder] = useState<OrderDetails | null>(null); // State for viewing order details
  const [viewUser, setViewUser] = useState<User | null>(null); // State for viewing user details
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    fetch("https://fundedhorizon-back-65a0759eedf9.herokuapp.com/auth/users")
      .then((response) => response.json())
      .then((data) => {
        const formattedUsers = data.map((user: any) => ({
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
          country: user.country,
          phone_no: user.phone_no,
          address: user.address,
          createdAt: new Date().toISOString().split("T")[0],
        }))
        // Sort users by ID in descending order (newest first)
        const sortedUsers = formattedUsers.sort((a: User, b: User) => b.id - a.id);
        setUsers(sortedUsers);
      })
      .catch((error) => console.error("Error fetching users:", error))

    // Fetch running orders
    fetch("https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/running_orders")
      .then((response) => response.json())
      .then((data) => {
        setRunningOrders(data)
      })
      .catch((error) => console.error("Error fetching running orders:", error))

    // Fetch completed orders
    fetch("https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/completed_orders")
      .then((response) => response.json())
      .then((data) => {
        const formattedCompletedOrders = data.map((order: any) => ({
          id: order.complete_order_id,
          type: order.type as OrderType || OrderType.STANDARD,
          order_id: order.order_id,
          user: {
            name: order.username,
            email: "",
          },
          amount: order.account_size,
          status: OrderStatus.COMPLETED,
          createdAt: new Date().toISOString().split("T")[0],
          accountType: order.challenge_type,
          platformType: order.platform,
          platformLogin: order.platform_login,
          platformPassword: order.platform_password,
          server: order.server,
          sessionId: order.session_id,
          terminalId: order.terminal_id,
          startingBalance: parseInt(order.account_size),
          currentBalance: parseInt(order.account_size),
          paymentMethod: order.payment_method,
          txid: order.txid
        }))
        setCompletedOrders(formattedCompletedOrders)
      })
      .catch((error) => console.error("Error fetching completed orders:", error))

    // Fetch pending orders
    fetch("https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/orders")
      .then((response) => response.json())
      .then((data) => {
        const formattedOrders = data.map((order: any) => ({
          id: order.id,  // This is the FDH format ID
          type: order.type as OrderType || OrderType.STANDARD,
          user: {
            name: order.username,
            email: order.email,
          },
          amount: order.account_size,
          status: OrderStatus.PENDING,
          createdAt: new Date().toISOString().split("T")[0],
          accountType: order.challenge_type,
          platformType: order.platform,
          platformLogin: order.txid,
          platformPassword: "N/A",
          server: "None",
          startingBalance: parseInt(order.account_size),
          currentBalance: parseInt(order.account_size),
          profitTarget: 0,
          paymentMethod: order.payment_method,
          txid: order.txid,
          order_id: order.id  // Store the FDH format ID here as well
        }))

        // Filter out orders that are in completedOrders
        const pendingOrders = formattedOrders.filter(
          (order: OrderDetails) => !completedOrders.some((completedOrder) => 
            completedOrder.order_id && order.id && completedOrder.order_id === order.id.toString()
          )
        )
        setOrders(pendingOrders)
      })
      .catch((error) => console.error("Error fetching orders:", error))

    // Fetch failed orders
    fetch("https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/failed_orders")
      .then((response) => response.json())
      .then((data) => {
        const formattedFailedOrders = data.map((order: any) => ({
          id: order.fail_order_id,
          type: order.type as OrderType || OrderType.STANDARD,
          order_id: order.order_id,
          user: {
            name: order.username,
            email: order.email,
          },
          amount: order.account_size,
          status: OrderStatus.CANCELLED,
          createdAt: new Date().toISOString().split("T")[0],
          accountType: order.challenge_type,
          platformType: order.platform,
          paymentMethod: order.payment_method,
          txid: order.txid,
          reason: order.reason
        }))
        setFailedOrders(formattedFailedOrders)
      })
      .catch((error) => console.error("Error fetching failed orders:", error))

    // Fetch rejected orders
    fetch("https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/rejected_orders")
      .then((response) => response.json())
      .then((data) => {
        const formattedRejectedOrders = data.map((order: any) => ({
          id: order.reject_order_id,
          type: order.type || 'standard',
          order_id: order.order_id,
          user: {
            name: order.username,
            email: order.email,
          },
          amount: order.account_size,
          status: "Rejected",
          createdAt: new Date().toISOString().split("T")[0],
          accountType: order.challenge_type,
          platformType: order.platform,
          paymentMethod: order.payment_method,
          txid: order.txid,
          reason: order.reason
        }))
        setRejectedOrders(formattedRejectedOrders)
      })
      .catch((error) => console.error("Error fetching rejected orders:", error))
  }, [])

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleEditOrder = (order: OrderDetails) => {
    setEditedOrder(order)
  }

  const handleViewOrder = (order: OrderDetails) => {
    setViewOrder(order);
  }

  const handleViewUser = (user: User) => {
    setViewUser(user);
  }

  const handlePassOrder = async (orderId: string) => {
    try {
      const response = await fetch(`https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/pass_order/${orderId}`, {
        method: 'POST'
      });

      if (response.ok) {
        alert(`Order ${orderId} passed successfully`);
        // Refresh running orders
        const updatedRunningOrders = runningOrders.filter(order => order.order_id !== orderId);
        setRunningOrders(updatedRunningOrders);
      } else {
        throw new Error('Failed to pass order');
      }
    } catch (error) {
      console.error('Error passing order:', error);
      alert('Failed to pass order');
    }
  };

  const handleFailRunningOrder = async (orderId: string) => {
    try {
      const response = await fetch(`https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/fail_running_order/${orderId}`, {
        method: 'POST'
      });

      if (response.ok) {
        alert(`Order ${orderId} failed`);
        // Refresh running orders
        const updatedRunningOrders = runningOrders.filter(order => order.order_id !== orderId);
        setRunningOrders(updatedRunningOrders);
      } else {
        throw new Error('Failed to fail order');
      }
    } catch (error) {
      console.error('Error failing order:', error);
      alert('Failed to fail order');
    }
  };

  const handleSaveChanges = async (order: OrderDetails) => {
    try {
      if (selectedSection === "completedOrders") {
        // Handle editing completed order
        const formData = new FormData();
        formData.append('server', order.server || '');
        formData.append('platform_login', order.platformLogin || '');
        formData.append('platform_password', order.platformPassword || '');
        formData.append('session_id', order.sessionId || '');
        formData.append('terminal_id', order.terminalId || '');

        const response = await fetch(`https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/edit_complete_order/${order.id}`, {
          method: 'PUT',
          body: formData
        });

        if (response.ok) {
          // Update the completed orders list
          const updatedOrders = completedOrders.map(o => {
            if (o.id === order.id) {
              return { ...o, ...order };
            }
            return o;
          });
          setCompletedOrders(updatedOrders);
          alert('Completed order updated successfully!');
        } else {
          throw new Error('Failed to update completed order');
        }
      } else {
        // Handle regular pending orders
        const updatedOrders = orders.map(o => {
          if (o.id === order.id) {
            return { ...o, ...order };
          }
          return o;
        });
        setOrders(updatedOrders);
      }
      setEditedOrder(null);
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order. Please try again.');
    }
  }

  const handleConfirmOrder = async (order: OrderDetails) => {
    try {
      // Prepare request body with required fields
      const formData = new FormData()
      formData.append('server', order.server || '')
      formData.append('platform_login', order.platformLogin || '')
      formData.append('platform_password', order.platformPassword || '')
      formData.append('session_id', order.sessionId || '')
      formData.append('terminal_id', order.terminalId || '')
      formData.append('profit_target', order.profitTarget?.toString() || '0') // Include profit target

      // Extract numeric part from order ID
      const orderId = order.id.toString().replace(/[^\d]/g, '')

      // Call the complete order endpoint
      const response = await fetch(`https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/complete_order/${orderId}`, {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        // Update local state
        const updatedOrders = orders.filter(o => o.id !== order.id)
        setOrders(updatedOrders)
        
        // Add to completed orders
        const completedOrder = {
          ...order,
          status: OrderStatus.COMPLETED
        }
        setCompletedOrders(prev => [...prev, completedOrder])

        // Show success message
        alert('Order completed successfully!')
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to complete order')
      }
    } catch (error) {
      console.error('Error completing order:', error)
      alert('Failed to complete order. Please try again.')
    }
  }

  const handleRejectOrder = async (order: OrderDetails, reason: RejectReasons) => {
    try {
      const formData = new FormData();
      formData.append('reason', reason);
      const response = await fetch(`https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/reject_order/${order.id}`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert(`Order ${order.id} rejected due to: ${reason}`);
      } else {
        console.error('Failed to reject order');
      }
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  }

  const handleFailOrder = async (order: OrderDetails, reason: FailReasons) => {
    try {
      const formData = new FormData();
      formData.append('reason', reason);
      const response = await fetch(`https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/fail_order/${order.id}`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert(`Order ${order.id} failed due to: ${reason}`);
      } else {
        console.error('Failed to fail order');
      }
    } catch (error) {
      console.error('Error failing order:', error);
    }
  }

  const filteredOrders = (selectedSection === "completedOrders" ? completedOrders : selectedSection === "failedOrders" ? failedOrders : selectedSection === "rejectedOrders" ? rejectedOrders : orders).filter(
    (order) =>
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.paymentMethod || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.txid || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.user.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.order_id || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const renderTable = () => {
    if (!isClient) {
      return null
    }

    switch (selectedSection) {
      case "users":
        return (
          <div className="overflow-x-auto">
            <div className="mb-4">
              <Input
                placeholder="Search by name, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm bg-[#1E3A5F]/20 border-[#1E3A5F] text-white rounded-lg shadow-md text-sm"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Username</TableHead>
                  <TableHead className="text-xs">Name</TableHead>
                  <TableHead className="text-xs">Email</TableHead>
                  <TableHead className="text-xs">Country</TableHead>
                  {!isMobile && <TableHead className="text-xs">Created At</TableHead>}
                  <TableHead className="text-xs">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="text-xs">{user.username}</TableCell>
                    <TableCell className="text-xs">{user.name}</TableCell>
                    <TableCell className="text-xs">{user.email}</TableCell>
                    <TableCell className="text-xs">{user.country}</TableCell>
                    {!isMobile && <TableCell className="text-xs">{user.createdAt}</TableCell>}
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg text-xs">
                          Edit
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewUser(user)}
                              className="bg-green-500 text-white hover:bg-green-600 rounded-lg text-xs"
                            >
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[95vw] md:max-w-3xl bg-gray-900 border border-orange-800 shadow-2xl rounded-xl">
                            <DialogHeader>
                              <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
                                <div className="p-1.5 bg-orange-900 rounded-lg">
                                  <CreditCard className="w-5 h-5 text-orange-300" />
                                </div>
                                User Details
                              </DialogTitle>
                              <DialogDescription className="text-gray-400 text-sm mt-2">
                                Complete information about the user.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="mt-6 space-y-6">
                              {/* User Information */}
                              <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                  <User className="h-4 w-4 text-orange-400" />
                                  User Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-black/20 p-4 rounded-lg border border-gray-800/50">
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Full Name</p>
                                    <p className="text-sm font-medium text-white">{viewUser?.name}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Email Address</p>
                                    <p className="text-sm font-medium text-white">{viewUser?.email}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Phone Number</p>
                                    <p className="text-sm font-medium text-white">{viewUser?.phone_no || 'N/A'}</p>
                                  </div>
                                </div>
                              </div>

                              {/* User Details */}
                              <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                  <User className="h-4 w-4 text-orange-400" />
                                  User Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-black/20 p-4 rounded-lg border border-gray-800/50">
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Country</p>
                                    <p className="text-sm font-medium text-white">{viewUser?.country}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Created At</p>
                                    <p className="text-sm font-medium text-white">{viewUser?.createdAt}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Address */}
                              <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                  <User className="h-4 w-4 text-orange-400" />
                                  Address
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-black/20 p-4 rounded-lg border border-gray-800/50">
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Address</p>
                                    <p className="text-sm font-medium text-white">{viewUser?.address}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
      case "runningOrders":
        return (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Order ID</TableHead>
                  <TableHead className="text-xs">Platform Login</TableHead>
                  <TableHead className="text-xs">Platform Password</TableHead>
                  <TableHead className="text-xs">Server</TableHead>
                  <TableHead className="text-xs">Session ID</TableHead>
                  <TableHead className="text-xs">Terminal ID</TableHead>
                  <TableHead className="text-xs">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {runningOrders.map((order) => (
                  <TableRow key={order.order_id}>
                    <TableCell className="text-xs">{order.order_id}</TableCell>
                    <TableCell className="text-xs">{order.platform_login}</TableCell>
                    <TableCell className="text-xs">{order.platform_password}</TableCell>
                    <TableCell className="text-xs">{order.server}</TableCell>
                    <TableCell className="text-xs">{order.session_id}</TableCell>
                    <TableCell className="text-xs">{order.terminal_id}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePassOrder(order.order_id)}
                          className="bg-green-500 text-white hover:bg-green-600 rounded-lg text-xs"
                        >
                          Pass
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleFailRunningOrder(order.order_id)}
                          className="bg-red-500 text-white hover:bg-red-600 rounded-lg text-xs"
                        >
                          Fail
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
      case "orders":
      case "completedOrders":
      case "failedOrders":
      case "rejectedOrders":
        return (
          <div className="overflow-x-auto">
            <div className="mb-4">
              <Input
                placeholder="Search by name, email, payment method, transaction ID, or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm bg-[#1E3A5F]/20 border-[#1E3A5F] text-white text-xs"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Order ID</TableHead>
                  <TableHead className="text-xs">Name</TableHead>
                  <TableHead className="text-xs">Email</TableHead>
                  <TableHead className="text-xs">Account Type</TableHead>
                  <TableHead className="text-xs">Amount</TableHead>
                  <TableHead className="text-xs">Platform</TableHead>
                  <TableHead className="text-xs">Payment Method</TableHead>
                  <TableHead className="text-xs">Transaction ID</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  {!isMobile && <TableHead className="text-xs">Created At</TableHead>}
                  <TableHead className="text-xs">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="text-xs font-medium">{order.id}</TableCell>
                    <TableCell className="text-xs">{order.user.name}</TableCell>
                    <TableCell className="text-xs">{order.user.email}</TableCell>
                    <TableCell className="text-xs">{order.accountType}</TableCell>
                    <TableCell className="text-xs">${order.amount}</TableCell>
                    <TableCell className="text-xs">{order.platformType}</TableCell>
                    <TableCell className="text-xs">{order.paymentMethod}</TableCell>
                    <TableCell className="text-xs">{order.txid}</TableCell>
                    <TableCell className="text-xs">{order.status}</TableCell>
                    {!isMobile && <TableCell className="text-xs">{order.createdAt}</TableCell>}
                    <TableCell>
                      <div className={`flex ${isMobile ? 'flex-col' : 'flex-wrap'} gap-2`}>
                        <EditOrderModal
                          order={order}
                          onSave={handleSaveChanges}
                          onReject={handleRejectOrder}
                          onFail={handleFailOrder}
                        />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleConfirmOrder(order)}
                          className="w-full md:w-auto text-xs"
                        >
                          Confirm
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewOrder(order)}
                              className="w-full md:w-auto text-xs"
                            >
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[95vw] md:max-w-3xl max-h-[85vh] bg-gradient-to-b from-gray-900 to-gray-950 border border-orange-800/50 shadow-2xl rounded-xl overflow-hidden">
                            <DialogHeader className="sticky top-0 z-10 p-6 border-b border-orange-800/20 bg-black/20 backdrop-blur-sm">
                              <DialogTitle className="text-lg font-bold text-white flex items-center gap-2">
                                <div className="p-1.5 bg-orange-900/50 rounded-lg shadow-xl ring-1 ring-orange-500/20">
                                  <CreditCard className="w-5 h-5 text-orange-300" />
                                </div>
                                Order Details
                              </DialogTitle>
                              <DialogDescription className="text-gray-400 text-sm mt-2">
                                Complete information about the order and customer.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="overflow-y-auto max-h-[calc(85vh-8rem)] p-6 space-y-6 custom-scrollbar">
                              {/* Customer Information */}
                              <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4 transform hover:scale-[1.01] transition-transform duration-200"
                              >
                                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                  <div className="p-1 bg-blue-500/10 rounded-md ring-1 ring-blue-500/20">
                                    <User className="h-4 w-4 text-blue-400" />
                                  </div>
                                  Customer Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-black/40 p-4 rounded-xl border border-blue-500/20 shadow-xl">
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Full Name</p>
                                    <p className="text-sm font-medium text-white">{viewOrder?.user.name}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Email Address</p>
                                    <p className="text-sm font-medium text-white">{viewOrder?.user.email}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Phone Number</p>
                                    <p className="text-sm font-medium text-white">{viewOrder?.user.phone || 'N/A'}</p>
                                  </div>
                                </div>
                              </motion.div>

                              {/* Order Information */}
                              <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="space-y-4 transform hover:scale-[1.01] transition-transform duration-200"
                              >
                                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                  <div className="p-1 bg-orange-500/10 rounded-md ring-1 ring-orange-500/20">
                                    <CreditCard className="h-4 w-4 text-orange-400" />
                                  </div>
                                  Order Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-black/40 p-4 rounded-xl border border-orange-500/20 shadow-xl">
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Order ID</p>
                                    <p className="text-sm font-medium text-white">{viewOrder?.id}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Amount</p>
                                    <p className="text-sm font-medium text-white">{viewOrder?.amount}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Status</p>
                                    <Badge 
                                      variant="outline" 
                                      className={
                                        viewOrder?.status === OrderStatus.COMPLETED
                                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                                          : viewOrder?.status === OrderStatus.PENDING
                                          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                          : "bg-red-500/10 text-red-400 border-red-500/20"
                                      }
                                    >
                                      {viewOrder?.status}
                                    </Badge>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Account Type</p>
                                    <p className="text-sm font-medium text-white">{viewOrder?.accountType}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Platform</p>
                                    <p className="text-sm font-medium text-white">{viewOrder?.platformType}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Created At</p>
                                    <p className="text-sm font-medium text-white">{viewOrder?.createdAt}</p>
                                  </div>
                                </div>
                              </motion.div>

                              {/* Payment Information */}
                              <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className="space-y-4 transform hover:scale-[1.01] transition-transform duration-200"
                              >
                                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                  <div className="p-1 bg-green-500/10 rounded-md ring-1 ring-green-500/20">
                                    <Wallet className="h-4 w-4 text-green-400" />
                                  </div>
                                  Payment Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-black/40 p-4 rounded-xl border border-green-500/20 shadow-xl">
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Payment Method</p>
                                    <p className="text-sm font-medium text-white">{viewOrder?.paymentMethod || 'N/A'}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Transaction ID</p>
                                    <p className="text-sm font-medium text-white">{viewOrder?.txid || 'N/A'}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="text-xs text-gray-400">Starting Balance</p>
                                    <p className="text-sm font-medium text-white">${viewOrder?.startingBalance?.toLocaleString() || '0'}</p>
                                  </div>
                                </div>
                              </motion.div>

                              {/* Platform Credentials */}
                              {viewOrder?.platformLogin && (
                                <motion.div 
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: 0.3 }}
                                  className="space-y-4 transform hover:scale-[1.01] transition-transform duration-200"
                                >
                                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                    <div className="p-1 bg-purple-500/10 rounded-md ring-1 ring-purple-500/20">
                                      <Shield className="h-4 w-4 text-purple-400" />
                                    </div>
                                    Platform Credentials
                                  </h3>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-black/40 p-4 rounded-xl border border-purple-500/20 shadow-xl">
                                    <div className="space-y-1">
                                      <p className="text-xs text-gray-400">Login</p>
                                      <p className="text-sm font-medium text-white">{viewOrder?.platformLogin}</p>
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-xs text-gray-400">Server</p>
                                      <p className="text-sm font-medium text-white">{viewOrder?.server || 'N/A'}</p>
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-xs text-gray-400">Terminal ID</p>
                                      <p className="text-sm font-medium text-white">{viewOrder?.terminalId || 'N/A'}</p>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </DialogContent>

                          <style jsx global>{`
                            .custom-scrollbar::-webkit-scrollbar {
                              width: 8px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-track {
                              background: rgba(0, 0, 0, 0.2);
                              border-radius: 4px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb {
                              background: rgba(251, 146, 60, 0.3);
                              border-radius: 4px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                              background: rgba(251, 146, 60, 0.5);
                            }
                          `}</style>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xs">
            {selectedSection ? selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1) : "Select a section"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${selectedSection}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 rounded-lg shadow-md text-xs"
              />
            </div>
          </div>
          {renderTable()}
        </CardContent>
      </Card>
    </motion.div>
  )
}
