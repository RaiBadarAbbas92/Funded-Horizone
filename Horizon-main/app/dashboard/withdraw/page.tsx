import { WithdrawForm } from './withdraw-form'
import { WithdrawHistory } from './withdraw-history'
import {Header} from "@/components/header"

export default function WithdrawPage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <WithdrawForm />
        <WithdrawHistory />
      </div>
    </main>
  )
}

