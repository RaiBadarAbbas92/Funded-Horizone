import Image from "next/image"
import { Copy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface PaymentDetailsProps {
  isOpen: boolean
  onClose: () => void
  selectedCoin: string
}

const PAYMENT_DETAILS = {
  btc: {
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    qrCode: "/qr.svg?height=200&width=200",
    network: "Bitcoin Network (BTC)"
  },
  eth: {
    address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    qrCode: "/qr.svg?height=200&width=200",
    network: "Ethereum Network (ERC20)"
  },
  usdt: {
    address: "TPYJRpLJBRxqUxjEUzsCQKYtHc1LWGrKxn",
    qrCode: "/qr.svg?height=200&width=200",
    network: "Tron Network (TRC20)"
  }
}

export function PaymentDetails({ isOpen, onClose, selectedCoin }: PaymentDetailsProps) {
  const paymentInfo = PAYMENT_DETAILS[selectedCoin as keyof typeof PAYMENT_DETAILS]

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  if (!paymentInfo) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 text-slate-200 border-slate-700 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Payment Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-lg">
              <Image
                src={paymentInfo.qrCode || "/placeholder.svg"}
                alt="Payment QR Code"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-200">Network</Label>
              <div className="bg-slate-900 px-4 py-2 rounded-lg text-orange-500">
                {paymentInfo.network}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-200">Deposit Address</Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={paymentInfo.address}
                  className="bg-slate-900 border-slate-700 text-slate-200"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="border-slate-700 hover:bg-slate-700"
                  onClick={() => copyToClipboard(paymentInfo.address)}
                >
                  <Copy className="h-4 w-4 text-orange-500" />
                </Button>
              </div>
            </div>

            <div className="rounded-lg bg-orange-500/10 p-4 text-sm text-orange-500">
              <p>Important:</p>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>Send only {selectedCoin.toUpperCase()} to this deposit address</li>
                <li>Ensure you're sending on the correct network</li>
                <li>Transaction will be confirmed after network confirmation</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

