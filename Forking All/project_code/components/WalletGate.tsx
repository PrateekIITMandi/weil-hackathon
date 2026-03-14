"use client"

import { ReactNode } from "react"

export default function WalletGate({ children }: { children: ReactNode }) {
  if (!(window as any).WeilWallet) {
    return (
      <div className="flex h-screen items-center justify-center">
        Install WeilWallet Extension
      </div>
    )
  }

  return <>{children}</>
}