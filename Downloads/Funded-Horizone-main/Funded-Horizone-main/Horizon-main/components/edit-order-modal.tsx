import { useState } from "react"
import { CreditCard, Shield, LineChart, ChevronDown } from "lucide-react"
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

enum FailReasons {
  NETWORK_ERROR = "Network Error",
  SERVER_ERROR = "Server Error",
  TIMEOUT = "Timeout",
}

enum OrderStatus {
  PENDING = "Pending",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

enum OrderType {
  LIMIT = "Limit",
  MARKET = "Market",
}

interface OrderDetails {
  id: number
  user: {
    name: string
    email: string
    phone?: string
  }
  amount: string
  status: OrderStatus
  type: OrderType
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
  order_id?: string
  paymentMethod?: string
  txid?: string
  sessionId?: string
  terminalId?: string
}

interface EditOrderModalProps {
  order: OrderDetails
  onSave: (order: OrderDetails) => Promise<void>
  onFail: (order: OrderDetails, reason: FailReasons) => Promise<void>
}

export function EditOrderModal({ order, onSave, onFail }: EditOrderModalProps) {
  const [editedOrder, setEditedOrder] = useState<OrderDetails>(order)
  const [showFailReasons, setShowFailReasons] = useState(false)

  const handleSaveChanges = async () => {
    await onSave(editedOrder)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          size="sm"
          className="w-full md:w-auto bg-gradient-to-r from-orange-900 to-orange-700 hover:from-orange-950 hover:to-orange-800 text-white border-orange-700 shadow-xl transition duration-300 rounded-xl"
        >
          Edit Order
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] md:max-w-3xl bg-gray-900 border border-orange-800 shadow-2xl rounded-xl p-3 md:p-4 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-base md:text-lg font-bold text-white flex items-center gap-2">
            <div className="p-1.5 bg-orange-900 rounded-lg shadow-lg">
              <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-orange-300" />
            </div>
            Order Management
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-xs mt-1">
            Manage and modify order details securely.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="order" className="w-full mt-3">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800 p-1 rounded-lg shadow-lg gap-1.5">
            <TabsTrigger 
              value="order"
              className="data-[state=active]:bg-orange-900 data-[state=active]:text-white text-gray-300 font-semibold rounded-md py-1.5 text-xs"
            >
              Order Information
            </TabsTrigger>
            <TabsTrigger 
              value="user"
              className="data-[state=active]:bg-orange-900 data-[state=active]:text-white text-gray-300 font-semibold rounded-md py-1.5 text-xs"
            >
              Customer Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="order" className="mt-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {/* Account Info Section */}
              <div className="space-y-2 bg-gray-800 p-3 rounded-lg border border-orange-800 shadow-lg">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-orange-400" />
                  Account Information
                </h3>
                <div className="space-y-2">
                  <div>
                    <Label className="text-gray-300 text-xs">Account Type</Label>
                    <Input 
                      value={editedOrder?.accountType || ''} 
                      readOnly 
                      className="mt-0.5 bg-gray-700 border-orange-700 text-white rounded-md text-xs h-8" 
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">Platform Type</Label>
                    <Input 
                      value={editedOrder?.platformType || ''} 
                      readOnly 
                      className="mt-0.5 bg-gray-700 border-orange-700 text-white rounded-md text-xs h-8" 
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">Profit Target</Label>
                    <Input 
                      value={editedOrder?.profitTarget?.toString() || ''} 
                      onChange={(e) => setEditedOrder(prev => ({ ...prev, profitTarget: parseFloat(e.target.value) }))}
                      className="mt-0.5 bg-gray-700 border-orange-700 text-white rounded-md text-xs h-8" 
                    />
                  </div>
                </div>
              </div>

              {/* Platform Details Section */}
              <div className="space-y-2 bg-gray-800 p-3 rounded-lg border border-orange-800 shadow-lg">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <LineChart className="w-3.5 h-3.5 text-orange-400" />
                  Platform Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <Label className="text-gray-300 text-xs">Login</Label>
                    <Input 
                      value={editedOrder?.platformLogin || ''} 
                      onChange={(e) => setEditedOrder(prev => ({ ...prev, platformLogin: e.target.value }))}
                      className="mt-0.5 bg-gray-700 border-orange-700 text-white rounded-md text-xs h-8" 
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">Password</Label>
                    <Input 
                      value={editedOrder?.platformPassword || ''} 
                      onChange={(e) => setEditedOrder(prev => ({ ...prev, platformPassword: e.target.value }))}
                      type="password" 
                      className="mt-0.5 bg-gray-700 border-orange-700 text-white rounded-md text-xs h-8" 
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">Server</Label>
                    <Input 
                      value={editedOrder?.server || ''} 
                      onChange={(e) => setEditedOrder(prev => ({ ...prev, server: e.target.value }))}
                      className="mt-0.5 bg-gray-700 border-orange-700 text-white rounded-md text-xs h-8" 
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">Session ID</Label>
                    <Input 
                      value={editedOrder?.sessionId || ''} 
                      onChange={(e) => setEditedOrder(prev => ({ ...prev, sessionId: e.target.value }))}
                      className="mt-0.5 bg-gray-700 border-orange-700 text-white rounded-md text-xs h-8" 
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">Terminal ID</Label>
                    <Input 
                      value={editedOrder?.terminalId || ''} 
                      onChange={(e) => setEditedOrder(prev => ({ ...prev, terminalId: e.target.value }))}
                      className="mt-0.5 bg-gray-700 border-orange-700 text-white rounded-md text-xs h-8" 
                    />
                  </div>
                </div>
              </div>

              {/* Balance & Payment Section */}
              <div className="lg:col-span-2 space-y-2 bg-gray-800 p-3 rounded-lg border border-orange-800 shadow-lg">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-orange-400" />
                  Balance & Payment Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <div>
                    <Label className="text-gray-300 text-xs">Starting Balance</Label>
                    <Input 
                      value={editedOrder?.startingBalance?.toString() || ''} 
                      readOnly 
                      className="mt-0.5 bg-gray-700 border-orange-700 text-white rounded-md text-xs h-8" 
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">Current Balance</Label>
                    <Input 
                      value={editedOrder?.currentBalance?.toString() || ''} 
                      readOnly 
                      className="mt-0.5 bg-gray-700 border-orange-700 text-white rounded-md text-xs h-8" 
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">Payment Method</Label>
                    <Input 
                      value={editedOrder?.paymentMethod || ''} 
                      readOnly 
                      className="mt-0.5 bg-gray-700 border-orange-700 text-white rounded-md text-xs h-8" 
                    />
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs">Transaction ID</Label>
                    <Input 
                      value={editedOrder?.txid || ''} 
                      readOnly 
                      className="mt-0.5 bg-gray-700 border-orange-700 text-white rounded-md text-xs h-8" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="user" className="mt-3">
            <div className="bg-gray-800 p-3 rounded-lg border border-orange-800 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label className="text-gray-300 text-xs">Customer Name</Label>
                  <Input 
                    value={editedOrder?.user.name || ''} 
                    readOnly 
                    className="mt-0.5 bg-gray-700 border-orange-700 text-white rounded-md text-xs h-8" 
                  />
                </div>
                <div>
                  <Label className="text-gray-300 text-xs">Email Address</Label>
                  <Input 
                    value={editedOrder?.user.email || ''} 
                    readOnly 
                    className="mt-0.5 bg-gray-700 border-orange-700 text-white rounded-md text-xs h-8" 
                  />
                </div>
                <div>
                  <Label className="text-gray-300 text-xs">Phone Number</Label>
                  <Input 
                    value={editedOrder?.user.phone || ''} 
                    readOnly 
                    className="mt-0.5 bg-gray-700 border-orange-700 text-white rounded-md text-xs h-8" 
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            <div className="space-y-1">
              <Label className="text-gray-300 text-xs">Order Status</Label>
              <select 
                value={editedOrder.status} 
                onChange={(e) => setEditedOrder(prev => ({ ...prev, status: e.target.value as OrderStatus }))}
                className="w-full bg-gray-700 border-orange-700 text-white p-1.5 rounded-md text-xs h-8"
              >
                {Object.values(OrderStatus).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <Label className="text-gray-300 text-xs">Order Type</Label>
              <select 
                value={editedOrder.type} 
                onChange={(e) => setEditedOrder(prev => ({ ...prev, type: e.target.value as OrderType }))}
                className="w-full bg-gray-700 border-orange-700 text-white p-1.5 rounded-md text-xs h-8"
              >
                {Object.values(OrderType).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-3">
            <div className="relative">
              <Button 
                variant="outline" 
                onClick={() => setShowFailReasons(!showFailReasons)}
                className="w-full md:w-auto flex items-center justify-between border border-orange-700 text-orange-500 text-xs rounded-lg py-1.5 px-3 shadow-lg hover:bg-orange-950/30"
              >
                Mark as Failed <ChevronDown className={`ml-1.5 w-3 h-3 transform transition-transform ${showFailReasons ? 'rotate-180' : ''}`} />
              </Button>
              {showFailReasons && (
                <div className="absolute top-full left-0 mt-1.5 w-full z-50">
                  {Object.values(FailReasons).map(reason => (
                    <Button 
                      key={reason} 
                      variant="outline" 
                      onClick={() => onFail(editedOrder, reason)}
                      className="w-full border border-orange-700 text-orange-500 text-xs rounded-lg py-1.5 shadow-lg hover:bg-orange-950/30 mb-1.5"
                    >
                      {reason}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <Button 
              type="submit" 
              onClick={handleSaveChanges}
              className="w-full md:w-auto bg-orange-900 hover:bg-orange-800 text-white text-xs rounded-lg py-1.5 px-3 shadow-lg transition duration-300"
            >
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 