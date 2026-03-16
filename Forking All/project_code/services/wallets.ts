// import { WeilWalletConnection } from "@weilliptic/weil-sdk"

// let wallet: WeilWalletConnection | null = null

// export const getWallet = () => {
//   if (wallet) return wallet

//   if (!(window as any).WeilWallet) {
//     throw new Error("WeilWallet extension not installed")
//   }

//   wallet = new WeilWalletConnection({
//     walletProvider: (window as any).WeilWallet,
//   })

//   return wallet
// }

// const extractAddress = (account: any): string | null => {
//   if (!account) return null

//   if (typeof account === "string") return account

//   if (typeof account === "object") {
//     if (account.address) return account.address
//     if (account.account) return account.account
//     if (account.id) return account.id

//     // fallback if wallet returns weird object
//     if (account.toString && account.toString() !== "[object Object]") {
//       return account.toString()
//     }
//   }

//   return null
// }

// export const connectWallet = async (): Promise<string | null> => {
//   if (!(window as any).WeilWallet) {
//     throw new Error("WeilWallet extension not installed")
//   }

//   const accounts = await (window as any).WeilWallet.request({
//     method: "weil_requestAccounts",
//   })

//   if (!accounts || accounts.length === 0) {
//     throw new Error("No wallet accounts found")
//   }

//   const address = extractAddress(accounts[0])

//   // create SDK wallet instance
//   getWallet()

//   return address
// }
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

const extractAddress = (account: any): string | null => {
  if (!account) return null

  if (typeof account === "string") return account

  if (typeof account === "object") {
    if (account.address) return account.address
    if (account.account) return account.account
    if (account.id) return account.id

    if (account.toString && account.toString() !== "[object Object]") {
      return account.toString()
    }
  }

  return null
}

export const connectWallet = async (): Promise<string | null> => {
  const walletProvider = (window as any).WeilWallet

  if (!walletProvider) {
    throw new Error("WeilWallet extension not installed")
  }

  const accounts = await walletProvider.request({
    method: "weil_requestAccounts",
  })

  if (!accounts || accounts.length === 0) {
    throw new Error("No wallet accounts found")
  }

  const address = extractAddress(accounts[0])

  getWallet()

  return address
}

export const getConnectedWallet = async (): Promise<string | null> => {
  const walletProvider = (window as any).WeilWallet

  if (!walletProvider) return null

  if (!walletProvider.isConnected?.()) return null

  const accounts = await walletProvider.request({
    method: "weil_accounts",
  })

  if (!accounts || accounts.length === 0) return null

  return extractAddress(accounts[0])
}