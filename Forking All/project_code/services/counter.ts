import { getWallet } from "./wallets"
import { parseExecutionResult, Schema } from "@weilliptic/weil-sdk"
import { Buffer } from "buffer"

const fileToHex = async (file: File) => {
  const buffer = await file.arrayBuffer()
  return Buffer.from(buffer).toString("hex")
}

export const deployCounter = async (
  wasmFile: File,
  widlFile: File
): Promise<string> => {

  const wallet = getWallet()

  const wasmHex = await fileToHex(wasmFile)
  const widlHex = await fileToHex(widlFile)

  const result = await wallet.contracts.deploy(
    wasmHex,
    widlHex,
    {
      author: "frontend",
      pods: ["POD_1f79824ceab946e8957d9b4677275921"]
    }
  )

  console.log("FULL DEPLOY RESULT:", result)

  const addr = result?.[0]?.contract_address

  if (!addr) {
    throw new Error("Deploy succeeded but address missing")
  }

  return addr
}

export const getCount = async (address: string) => {

  const wallet = getWallet()

  const result = await wallet.contracts.execute(
    address,
    "get_count",
    {}
  )

  return parseExecutionResult(result, Schema.u32)
}

export const increment = async (address: string) => {

  const wallet = getWallet()

  const result = await wallet.contracts.execute(
    address,
    "increment",
    {}
  )

  parseExecutionResult(result, Schema.void)

  return true
}