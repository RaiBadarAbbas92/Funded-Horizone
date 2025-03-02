import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, XCircle, CreditCard, Hash, Shield, LineChart } from "lucide-react" 
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

interface OrderDetails {
  id: number
  user: {
    name: string
    email: string
    phone?: string
  }
  amount: string
  status: string
  createdAt: string
  accountType?: string
  platformType?: string
  platformLogin?: string
  platformPassword?: string
  server?: string
  startingBalance?: number
  currentBalance?: number
  profitTarget?: number
  paymentProof?: string
  orderId?: string
  paymentMethod?: string
  txid?: string
}

interface User {
  id: number
  name: string
  email: string
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
    status: "Completed",
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
    status: "Pending",
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
  selectedSection: "users" | "orders" | "completedOrders" | "failedOrders" | null
}

export function AdminTables({ selectedSection }: AdminTablesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [orders, setOrders] = useState(mockOrders)
  const [completedOrders, setCompletedOrders] = useState<OrderDetails[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [selectedPaymentProof, setSelectedPaymentProof] = useState<string | null>(null)
  const [editedOrder, setEditedOrder] = useState<OrderDetails | null>(null)
  const [isMobile, setIsMobile] = useState(false)

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
          name: user.name,
          email: user.email,
          createdAt: new Date().toISOString().split("T")[0],
        }))
        setUsers(formattedUsers)
      })
      .catch((error) => console.error("Error fetching users:", error))
  }, [])

  useEffect(() => {
    // Fetch completed orders
    fetch("https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/completed_orders")
      .then((response) => response.json())
      .then((data) => {
        const formattedCompletedOrders = data.map((order: any) => ({
          id: order.complete_order_id,
          orderId: order.order_id,
          user: {
            name: order.username,
            email: "",
          },
          amount: order.account_size,
          status: "Completed",
          createdAt: new Date().toISOString().split("T")[0],
          accountType: order.challenge_type,
          platformType: order.platform,
          platformLogin: order.platform_login,
          platformPassword: order.platform_password,
          server: order.server,
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
          id: order.id,
          user: {
            name: order.username,
            email: order.email,
          },
          amount: order.account_size,
          status: "Pending",
          createdAt: new Date().toISOString().split("T")[0],
          accountType: order.challenge_type,
          platformType: order.platform,
          platformLogin: order.txid,
          platformPassword: "N/A",
          server: "None",
          startingBalance: parseInt(order.account_size),
          currentBalance: parseInt(order.account_size),
          profitTarget: 0,
          paymentProof: order.img,
          paymentMethod: order.payment_method,
          txid: order.txid
        }))

        // Filter out orders that are in completedOrders
        const pendingOrders = formattedOrders.filter(
          (order: OrderDetails) => !completedOrders.some((completedOrder) => completedOrder.orderId === order.id.toString())
        )
        setOrders(pendingOrders)
      })
      .catch((error) => console.error("Error fetching orders:", error))
  }, [])

  const handleEditOrder = (order: OrderDetails) => {
    setEditedOrder(order)
  }

  const handleSaveChanges = async () => {
    if (!editedOrder) return

    try {
      // Prepare request body with required fields
      const formData = new FormData()
      formData.append('server', editedOrder.server || '')
      formData.append('platform_login', editedOrder.platformLogin || '')
      formData.append('platform_password', editedOrder.platformPassword || '')

      // Extract numeric part from order ID (e.g., "FDH4" -> "4")
      const orderId = editedOrder.id.toString().replace(/[^\d]/g, '')

      // Call the complete order endpoint with numeric order_id
      const response = await fetch(`https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/complete_order/${orderId}`, {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        // Update local state
        const updatedOrders = orders.filter(o => o.id !== editedOrder.id)
        setOrders(updatedOrders)
        
        // Add to completed orders
        const completedOrder = {
          ...editedOrder,
          status: 'Completed'
        }
        setCompletedOrders(prev => [...prev, completedOrder])
        
        // Close dialog
        setEditedOrder(null)

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

  const handleConfirmOrder = async (order: OrderDetails) => {
    try {
      const formData = new FormData()
      formData.append('platform-login', order.platformLogin || '')
      formData.append('platform-password', order.platformPassword || '')
      formData.append('server', order.server || '')

      const response = await fetch(`https://fundedhorizon-back-65a0759eedf9.herokuapp.com/order/update/${order.id}`, {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        // Update local state
        const updatedOrder = {...order, status: 'Completed'}
        const updatedOrders = orders.filter(o => o.id !== order.id)
        setOrders(updatedOrders)
        setCompletedOrders([...completedOrders, updatedOrder])
      }
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  const filteredOrders = (selectedSection === "completedOrders" ? completedOrders : orders).filter(
    (order) =>
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.paymentMethod || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.txid || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const renderTable = () => {
    switch (selectedSection) {
      case "users":
        return (
          <div className="overflow-x-auto">
            <div className="mb-4">
              <Input
                placeholder="Search by name, email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm bg-[#1E3A5F]/20 border-[#1E3A5F] text-white"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  {!isMobile && <TableHead>Created At</TableHead>}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    {!isMobile && <TableCell>{user.createdAt}</TableCell>}
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
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
        return (
          <div className="overflow-x-auto">
            <div className="mb-4">
              <Input
                placeholder="Search by name, email, payment method, transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm bg-[#1E3A5F]/20 border-[#1E3A5F] text-white"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Amount</TableHead>
                  {!isMobile && <TableHead>Payment Details</TableHead>}
                  <TableHead>Status</TableHead>
                  {!isMobile && <TableHead>Created At</TableHead>}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    {!isMobile && (
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          <Badge variant="outline" className="flex items-center gap-2 w-fit">
                            <CreditCard className="h-4 w-4" />
                            {order.paymentMethod || "N/A"}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-2 w-fit">
                            <Hash className="h-4 w-4" />
                            {order.txid || "N/A"}
                          </Badge>
                        </div>
                      </TableCell>
                    )}
                    <TableCell>{order.status}</TableCell>
                    {!isMobile && <TableCell>{order.createdAt}</TableCell>}
                    <TableCell>
                      <div className={`flex ${isMobile ? 'flex-col' : 'flex-wrap'} gap-2`}>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditOrder(order)}
                              className="w-full md:w-auto bg-gradient-to-r from-[#1E3A5F]/50 to-[#1E3A5F]/30 hover:from-[#1E3A5F]/70 hover:to-[#1E3A5F]/50 border-orange-500/20"
                            >
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[95vw] md:max-w-3xl bg-[#0A1428] border border-[#1E3A5F] shadow-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-xl font-bold text-white flex items-center gap-3">
                                <div className="p-2 bg-orange-500/10 rounded-lg">
                                  <CreditCard className="w-5 h-5 text-orange-500" />
                                </div>
                                Order Details
                              </DialogTitle>
                              <DialogDescription className="text-gray-400">
                                View and edit complete order and user details.
                              </DialogDescription>
                            </DialogHeader>

                            <Tabs defaultValue="order" className="w-full">
                              <TabsList className="grid w-full grid-cols-2 bg-[#1E3A5F]/30 p-1 rounded-lg gap-2">
                                <TabsTrigger 
                                  value="order"
                                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                                >
                                  Order Details
                                </TabsTrigger>
                                <TabsTrigger 
                                  value="user"
                                  className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                                >
                                  User Details
                                </TabsTrigger>
                              </TabsList>

                              <TabsContent value="order" className="mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {/* Account Info Section */}
                                  <div className="space-y-4 bg-[#1E3A5F]/20 p-4 rounded-xl border border-[#1E3A5F]/50">
                                    <h3 className="font-semibold text-white flex items-center gap-2">
                                      <Shield className="w-4 h-4 text-orange-500" />
                                      Account Information
                                    </h3>
                                    <div className="space-y-3">
                                      <div>
                                        <Label className="text-gray-400">Account Type</Label>
                                        <Input 
                                          value={editedOrder?.accountType || ''} 
                                          readOnly 
                                          className="mt-1 bg-[#1E3A5F]/30 border-[#1E3A5F] text-white" 
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-gray-400">Platform Type</Label>
                                        <Input 
                                          value={editedOrder?.platformType || ''} 
                                          readOnly 
                                          className="mt-1 bg-[#1E3A5F]/30 border-[#1E3A5F] text-white" 
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Platform Details Section */}
                                  <div className="space-y-4 bg-[#1E3A5F]/20 p-4 rounded-xl border border-[#1E3A5F]/50">
                                    <h3 className="font-semibold text-white flex items-center gap-2">
                                      <LineChart className="w-4 h-4 text-orange-500" />
                                      Platform Details
                                    </h3>
                                    <div className="space-y-3">
                                      <div>
                                        <Label className="text-gray-400">Platform Login</Label>
                                        <Input 
                                          value={editedOrder?.platformLogin || ''} 
                                          onChange={(e) => setEditedOrder(prev => prev ? {...prev, platformLogin: e.target.value} : null)}
                                          className="mt-1 bg-[#1E3A5F]/30 border-[#1E3A5F] text-white" 
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-gray-400">Platform Password</Label>
                                        <Input 
                                          value={editedOrder?.platformPassword || ''} 
                                          onChange={(e) => setEditedOrder(prev => prev ? {...prev, platformPassword: e.target.value} : null)}
                                          type="password" 
                                          className="mt-1 bg-[#1E3A5F]/30 border-[#1E3A5F] text-white" 
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-gray-400">Server</Label>
                                        <Input 
                                          value={editedOrder?.server || ''} 
                                          onChange={(e) => setEditedOrder(prev => prev ? {...prev, server: e.target.value} : null)}
                                          className="mt-1 bg-[#1E3A5F]/30 border-[#1E3A5F] text-white" 
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Balance Info Section */}
                                  <div className="space-y-4 bg-[#1E3A5F]/20 p-4 rounded-xl border border-[#1E3A5F]/50">
                                    <h3 className="font-semibold text-white flex items-center gap-2">
                                      <CreditCard className="w-4 h-4 text-orange-500" />
                                      Balance Information
                                    </h3>
                                    <div className="space-y-3">
                                      <div>
                                        <Label className="text-gray-400">Starting Balance</Label>
                                        <Input 
                                          value={editedOrder?.startingBalance?.toString() || ''} 
                                          readOnly 
                                          className="mt-1 bg-[#1E3A5F]/30 border-[#1E3A5F] text-white" 
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-gray-400">Current Balance</Label>
                                        <Input 
                                          value={editedOrder?.currentBalance?.toString() || ''} 
                                          readOnly 
                                          className="mt-1 bg-[#1E3A5F]/30 border-[#1E3A5F] text-white" 
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Payment Info Section */}
                                  <div className="space-y-4 bg-[#1E3A5F]/20 p-4 rounded-xl border border-[#1E3A5F]/50">
                                    <h3 className="font-semibold text-white flex items-center gap-2">
                                      <CreditCard className="w-4 h-4 text-orange-500" />
                                      Payment Information
                                    </h3>
                                    <div className="space-y-3">
                                      <div>
                                        <Label className="text-gray-400">Payment Method</Label>
                                        <Input 
                                          value={editedOrder?.paymentMethod || ''} 
                                          readOnly 
                                          className="mt-1 bg-[#1E3A5F]/30 border-[#1E3A5F] text-white" 
                                        />
                                      </div>
                                      <div>
                                        <Label className="text-gray-400">Transaction ID</Label>
                                        <Input 
                                          value={editedOrder?.txid || ''} 
                                          readOnly 
                                          className="mt-1 bg-[#1E3A5F]/30 border-[#1E3A5F] text-white" 
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="user" className="mt-6">
                                <div className="bg-[#1E3A5F]/20 p-6 rounded-xl border border-[#1E3A5F]/50">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <Label className="text-gray-400">Name</Label>
                                      <Input 
                                        value={editedOrder?.user.name || ''} 
                                        readOnly 
                                        className="mt-1 bg-[#1E3A5F]/30 border-[#1E3A5F] text-white" 
                                      />
                                    </div>
                                    <div>
                                      <Label className="text-gray-400">Email</Label>
                                      <Input 
                                        value={editedOrder?.user.email || ''} 
                                        readOnly 
                                        className="mt-1 bg-[#1E3A5F]/30 border-[#1E3A5F] text-white" 
                                      />
                                    </div>
                                    <div>
                                      <Label className="text-gray-400">Phone</Label>
                                      <Input 
                                        value={editedOrder?.user.phone || ''} 
                                        readOnly 
                                        className="mt-1 bg-[#1E3A5F]/30 border-[#1E3A5F] text-white" 
                                      />
                                    </div>
                                  </div>
                                </div>
                              </TabsContent>
                            </Tabs>

                            <DialogFooter className="mt-6">
                              <Button 
                                type="submit" 
                                onClick={handleSaveChanges}
                                className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white"
                              >
                                Save changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleConfirmOrder(order)}
                          className="w-full md:w-auto"
                        >
                          Confirm
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedPaymentProof(order.paymentProof || null)}
                              className="w-full md:w-auto"
                            >
                              Payment Proof
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-[95vw] md:max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Payment Proof</DialogTitle>
                              <DialogDescription>View or upload payment proof for this order.</DialogDescription>
                            </DialogHeader>
                            {selectedPaymentProof && (
                              <div className="grid gap-4 py-4">
                                <img src={`data:image/jpeg;base64,${selectedPaymentProof}`} alt="Payment Proof" className="w-full h-auto" />
                              </div>
                            )}
                            <DialogFooter>
                              <Button type="submit" className="w-full md:w-auto">Upload</Button>
                            </DialogFooter>
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
          <CardTitle>
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
                className="pl-8"
              />
            </div>
          </div>
          {renderTable()}
        </CardContent>
      </Card>
    </motion.div>
  )
}
