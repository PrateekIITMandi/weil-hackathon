// "use client"

// import { useState, useEffect } from "react"
// import ChatWindow from "@/components/ChatWindow"
// import MessageInput from "@/components/MessageInput"
// import { runAgentTask } from "@/services/agent"
// import { buildPrompt, Message } from "@/lib/promptBuilder"
// import { connectWallet } from "@/services/wallets"

// export default function Home() {

//   const [messages, setMessages] = useState<Message[]>([])
//   const [walletAddress, setWalletAddress] = useState<string | null>(null)

//   // Normalize wallet account → always return string
//   const extractAddress = (account: any): string | null => {
//     if (!account) return null

//     if (typeof account === "string") return account

//     if (typeof account === "object") {
//       return account.address || account.account || account.id || null
//     }

//     return null
//   }

//   const handleDisconnect = async () => {
//     try {
//       if ((window as any).WeilWallet?.isConnected()) {
//         await (window as any).WeilWallet.request({
//           method: "wallet_disconnect",
//         })
//       }
//     } catch (err) {
//       console.error("Disconnect failed:", err)
//     } finally {
//       setWalletAddress(null)
//     }
//   }

//   // Detect wallet already connected on page load
//   useEffect(() => {
//     const checkConnection = async () => {
//       try {
//         const wallet = (window as any).WeilWallet
//         if (!wallet) return

//         if (wallet.isConnected()) {
//           const accounts = await wallet.request({
//             method: "weil_accounts",
//           })

//           if (accounts?.length > 0) {
//             const address = extractAddress(accounts[0])
//             if (address) setWalletAddress(address)
//           }
//         }
//       } catch (err) {
//         console.error("Wallet check failed:", err)
//       }
//     }

//     checkConnection()
//   }, [])

//   // Listen for wallet account changes
//   useEffect(() => {
//     const wallet = (window as any).WeilWallet
//     if (!wallet) return

//     const handleAccountsChanged = (accounts: any[]) => {
//       if (!accounts || accounts.length === 0) {
//         setWalletAddress(null)
//         return
//       }

//       const address = extractAddress(accounts[0])
//       if (address) setWalletAddress(address)
//     }

//     wallet.on?.("accountsChanged", handleAccountsChanged)

//     return () => {
//       wallet.removeListener?.("accountsChanged", handleAccountsChanged)
//     }
//   }, [])

//   const handleConnect = async () => {
//     try {
//       const addr = await connectWallet()

//       const address = extractAddress(addr)
//       if (address) {
//         setWalletAddress(address)
//         return
//       }

//       // fallback
//       const accounts = await (window as any).WeilWallet.request({
//         method: "weil_accounts",
//       })

//       if (accounts?.length > 0) {
//         const address = extractAddress(accounts[0])
//         if (address) setWalletAddress(address)
//       }

//     } catch (err) {
//       console.warn("Wallet connect warning:", err)
//       alert("Failed to connect wallet")
//     }
//   }

// const sendMessage = async (text: string) => {
//   try {
//     const newMessages: Message[] = [
//       ...messages,
//       { role: "user", content: text }
//     ]
//     setMessages(newMessages)

//     const prompt = buildPrompt(newMessages)
//     console.log("Prompt sent to agent:", prompt)

//     const response = await runAgentTask(prompt)
//     console.log("Agent response raw:", response)

//     const assistantMessage =
//       typeof response === "string" && response.length > 0
//         ? response
//         : "⚠️ Agent returned no response."

//     const updatedMessages: Message[] = [
//       ...newMessages,
//       { role: "assistant", content: assistantMessage }
//     ]
//     setMessages(updatedMessages)
//   } catch (err) {
//     console.error("sendMessage error:", err)
//     const errorMessages: Message[] = [
//       ...messages,
//       { role: "assistant", content: "⚠️ Failed to get response from agent." }
//     ]
//     setMessages(errorMessages)
//   }
// }

//   return (
//     <div className="flex flex-col h-screen bg-black text-white">

//       {/* Header */}
//       <div className="p-4 border-b border-gray-800 flex justify-between items-center">
//         <h1 className="text-lg font-semibold">Weil AI Agent</h1>

//         {!walletAddress ? (
//           <button
//             onClick={handleConnect}
//             className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Connect Wallet
//           </button>
//         ) : (
//           <div className="flex items-center gap-3">
//             <span className="bg-green-900 px-3 py-1 rounded text-green-300">
//               {walletAddress.slice(0,6)}...{walletAddress.slice(-4)}
//             </span>

//             <button
//               onClick={handleDisconnect}
//               className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
//             >
//               Disconnect
//             </button>
//           </div>
//         )}
//       </div>

//       <ChatWindow messages={messages} />
//       <MessageInput send={sendMessage} />

//     </div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import ChatWindow from "@/components/ChatWindow"
// import MessageInput from "@/components/MessageInput"
// import DeployCounter from "@/components/DeployApplet"
// import CounterPanel from "@/components/CounterPanel"

// import { runAgentTask } from "@/services/agent"
// import { buildPrompt, Message } from "@/lib/promptBuilder"
// import { connectWallet } from "@/services/wallets"

// export default function Home() {

//   const [messages, setMessages] = useState<Message[]>([])
//   const [walletAddress, setWalletAddress] = useState<string | null>(null)
//   const [contractAddress, setContractAddress] = useState<string | null>(null)

//   // ---------- YOUR WALLET CODE (UNCHANGED) ----------

//   const extractAddress = (account: any): string | null => {
//     if (!account) return null

//     if (typeof account === "string") return account

//     if (typeof account === "object") {
//       return account.address || account.account || account.id || null
//     }

//     return null
//   }

//   const handleDisconnect = async () => {
//     try {
//       if ((window as any).WeilWallet?.isConnected()) {
//         await (window as any).WeilWallet.request({
//           method: "wallet_disconnect",
//         })
//       }
//     } catch (err) {
//       console.error("Disconnect failed:", err)
//     } finally {
//       setWalletAddress(null)
//     }
//   }

//   useEffect(() => {
//     const checkConnection = async () => {
//       try {
//         const wallet = (window as any).WeilWallet
//         if (!wallet) return

//         if (wallet.isConnected()) {
//           const accounts = await wallet.request({
//             method: "weil_accounts",
//           })

//           if (accounts?.length > 0) {
//             const address = extractAddress(accounts[0])
//             if (address) setWalletAddress(address)
//           }
//         }
//       } catch (err) {
//         console.error("Wallet check failed:", err)
//       }
//     }

//     checkConnection()
//   }, [])

//   useEffect(() => {
//     const wallet = (window as any).WeilWallet
//     if (!wallet) return

//     const handleAccountsChanged = (accounts: any[]) => {
//       if (!accounts || accounts.length === 0) {
//         setWalletAddress(null)
//         return
//       }

//       const address = extractAddress(accounts[0])
//       if (address) setWalletAddress(address)
//     }

//     wallet.on?.("accountsChanged", handleAccountsChanged)

//     return () => {
//       wallet.removeListener?.("accountsChanged", handleAccountsChanged)
//     }
//   }, [])

//   const handleConnect = async () => {
//     try {
//       const addr = await connectWallet()

//       const address = extractAddress(addr)
//       if (address) {
//         setWalletAddress(address)
//         return
//       }

//       const accounts = await (window as any).WeilWallet.request({
//         method: "weil_accounts",
//       })

//       if (accounts?.length > 0) {
//         const address = extractAddress(accounts[0])
//         if (address) setWalletAddress(address)
//       }

//     } catch (err) {
//       console.warn("Wallet connect warning:", err)
//       alert("Failed to connect wallet")
//     }
//   }

//   // ---------- CHAT LOGIC (UNCHANGED) ----------

//   const sendMessage = async (text: string) => {
//     try {
//       const newMessages: Message[] = [
//         ...messages,
//         { role: "user", content: text }
//       ]
//       setMessages(newMessages)

//       const prompt = buildPrompt(newMessages)
//       const response = await runAgentTask(prompt)

//       const assistantMessage =
//         typeof response === "string" && response.length > 0
//           ? response
//           : "⚠️ Agent returned no response."

//       setMessages([
//         ...newMessages,
//         { role: "assistant", content: assistantMessage }
//       ])

//     } catch (err) {
//       console.error("sendMessage error:", err)
//     }
//   }

//   // ---------- UI ----------

//   return (
//     <div className="flex flex-col h-screen bg-black text-white">

//       <div className="p-4 border-b border-gray-800 flex justify-between items-center">
//         <h1 className="text-lg font-semibold">Weil AI Agent</h1>

//         {!walletAddress ? (
//           <button
//             onClick={handleConnect}
//             className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Connect Wallet
//           </button>
//         ) : (
//           <div className="flex items-center gap-3">
//             <span className="bg-green-900 px-3 py-1 rounded text-green-300">
//               {walletAddress.slice(0,6)}...{walletAddress.slice(-4)}
//             </span>

//             <button
//               onClick={handleDisconnect}
//               className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
//             >
//               Disconnect
//             </button>
//           </div>
//         )}
//       </div>

//       <ChatWindow messages={messages} />
//       <MessageInput send={sendMessage} />

//       {walletAddress && !contractAddress && (
//         <DeployCounter onDeploy={setContractAddress} />
//       )}

//       {contractAddress && (
//         <CounterPanel address={contractAddress} />
//       )}

//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import ChatWindow from "@/components/ChatWindow"
import MessageInput from "@/components/MessageInput"
import DeployCounter from "@/components/DeployApplet"
import CounterPanel from "@/components/CounterPanel"

import { runAgentTask } from "@/services/agent"
import { buildPrompt, Message } from "@/lib/promptBuilder"
import { connectWallet } from "@/services/wallets"

export default function Home() {

  const [messages, setMessages] = useState<Message[]>([])
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [contractAddress, setContractAddress] = useState<string | null>(null)

  const extractAddress = (account: any): string | null => {
    if (!account) return null
    if (typeof account === "string") return account
    if (typeof account === "object") {
      return account.address || account.account || account.id || null
    }
    return null
  }

  const handleDisconnect = async () => {
    try {
      if ((window as any).WeilWallet?.isConnected()) {
        await (window as any).WeilWallet.request({
          method: "wallet_disconnect",
        })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setWalletAddress(null)
    }
  }

  useEffect(() => {
    const checkConnection = async () => {
      const wallet = (window as any).WeilWallet
      if (!wallet) return

      if (wallet.isConnected()) {
        const accounts = await wallet.request({ method: "weil_accounts" })
        if (accounts?.length > 0) {
          const addr = extractAddress(accounts[0])
          if (addr) setWalletAddress(addr)
        }
      }
    }

    checkConnection()
  }, [])

  const handleConnect = async () => {
    try {
      const addr = await connectWallet()
      const address = extractAddress(addr)

      if (address) {
        setWalletAddress(address)
        return
      }

      const accounts = await (window as any).WeilWallet.request({
        method: "weil_accounts",
      })

      if (accounts?.length > 0) {
        const address = extractAddress(accounts[0])
        if (address) setWalletAddress(address)
      }

    } catch (err) {
      alert("Wallet connection failed")
    }
  }

  const sendMessage = async (text: string) => {

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: text }
    ]

    setMessages(newMessages)

    const prompt = buildPrompt(newMessages)
    const response = await runAgentTask(prompt)

    const assistant =
      typeof response === "string"
        ? response
        : "⚠️ Agent returned no response."

    setMessages([
      ...newMessages,
      { role: "assistant", content: assistant }
    ])
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* HEADER */}

      <div className="border-b border-gray-800 p-4 flex justify-between items-center">

        <h1 className="text-xl font-bold">
          Weil AI Smart-Contract Agent
        </h1>

        {!walletAddress ? (
          <button
            onClick={handleConnect}
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center gap-3">

            <span className="bg-green-900 text-green-300 px-3 py-1 rounded">
              {walletAddress.slice(0,6)}...{walletAddress.slice(-4)}
            </span>

            <button
              onClick={handleDisconnect}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Disconnect
            </button>

          </div>
        )}

      </div>


      {/* HERO SECTION */}

      <div className="p-6 border-b border-gray-800">

        <h2 className="text-2xl font-semibold mb-2">
          Deploy and Test a Weil Applet
        </h2>

        <p className="text-gray-400 max-w-2xl">
          This demo shows how an AI agent can deploy a smart-contract
          applet and interact with it using your wallet.  
          We deploy a simple counter contract and then test it by
          reading and updating the state on-chain.
        </p>

      </div>


      {/* STEPS */}

      <div className="grid grid-cols-3 gap-6 p-6 border-b border-gray-800">

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
          <h3 className="font-semibold mb-2">1️⃣ Connect Wallet</h3>
          <p className="text-gray-400 text-sm">
            Authenticate using Weil Wallet to sign the deployment
            transaction.
          </p>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
          <h3 className="font-semibold mb-2">2️⃣ Deploy Applet</h3>
          <p className="text-gray-400 text-sm">
            Upload WASM + WIDL to deploy a smart-contract applet
            to the Weil network.
          </p>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-800">
          <h3 className="font-semibold mb-2">3️⃣ Test Contract</h3>
          <p className="text-gray-400 text-sm">
            Interact with the deployed contract by calling
            increment and reading the counter value.
          </p>
        </div>

      </div>


      {/* MAIN CONTENT */}

      <div className="flex flex-1">

        {/* CHAT SIDE */}

        {/* <div className="w-1/2 border-r border-gray-800 flex flex-col">

          <div className="p-4 font-semibold border-b border-gray-800">
            AI Agent
          </div>

          <ChatWindow messages={messages} />
          <MessageInput send={sendMessage} />

        </div> */}


        {/* DEPLOYMENT PANEL */}

        <div className="w-1/2 flex flex-col">

          <div className="p-4 font-semibold border-b border-gray-800">
            Applet Deployment
          </div>

          <div className="p-6 space-y-6">

            {walletAddress && !contractAddress && (
              <DeployCounter onDeploy={setContractAddress} />
            )}

            {contractAddress && (
              <CounterPanel address={contractAddress} />
            )}

          </div>

        </div>

      </div>

    </div>
  )
}