import { getWallet } from "./wallets"
import { CONTRACT_ADDRESS } from "@/lib/constants"

export const runAgentTask = async (prompt: string): Promise<string> => {
  const wallet = getWallet()

  try {
    const result = await wallet.contracts.execute(CONTRACT_ADDRESS, "run_task", {
      task_prompt: prompt,
    })

    // Log everything we get
    console.log("💡 Raw contract execute result:", result)

    // Attempt to parse the output
    if (!result) return "⚠️ Agent returned no result."

    // Weil SDK often wraps output in txn_result
    if (typeof result.txn_result === "string") {
      try {
        const parsed = JSON.parse(result.txn_result)
        if (parsed.Ok) return parsed.Ok
        return JSON.stringify(parsed)
      } catch (err) {
        console.warn("Could not parse txn_result, returning raw:", err)
        return result.txn_result
      }
    }

    // Direct Ok
    if (result.Ok) return typeof result.Ok === "string" ? result.Ok : JSON.stringify(result.Ok)

    return "⚠️ Agent returned no output."

  } catch (err) {
    console.error("runAgentTask error:", err)
    return "⚠️ Failed to execute agent task."
  }
}