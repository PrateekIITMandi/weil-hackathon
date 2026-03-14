import { WeilWalletConnection } from "@weilliptic/weil-sdk"

let wallet: WeilWalletConnection | null = null

export const getWallet = () => {
  if (wallet) return wallet

  if (!(window as any).WeilWallet) {
    throw new Error("WeilWallet extension not installed")
  }

  wallet = new WeilWalletConnection({
    walletProvider: (window as any).WeilWallet,
  })

  return wallet
}