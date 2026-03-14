import { getWallet } from "./wallet"
import { CONTRACT_ADDRESS } from "@/lib/constants"

export const runAgentTask = async (prompt: string) => {
  const wallet = getWallet()

  const result = await wallet.contracts.execute(
    CONTRACT_ADDRESS,
    "run_task",
    {
      task_prompt: prompt,
    }
  )

  if (!result.success) {
    throw new Error("Agent execution failed")
  }

  return result.output
}