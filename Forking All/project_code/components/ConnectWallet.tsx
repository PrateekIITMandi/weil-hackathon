"use client"

import { getWallet } from "@/services/wallets"

export default function ConnectWallet() {
  const connect = async () => {
    await getWallet()
  }

  return (
    <button
      onClick={connect}
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Connect Wallet
    </button>
  )
}