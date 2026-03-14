import { getWallet } from "./wallets"
import { Chatbot } from "@/contracts/bindings"
import { CONTRACT_ADDRESS } from "@/lib/constants"

export const initChatbot = async () => {
  const wallet = await getWallet()
  return Chatbot(wallet, CONTRACT_ADDRESS)
}

export const createThread = async () => {
  const chatbot = await initChatbot()

  const models = await chatbot.list_models()
  return chatbot.new_thread(models[0])
}

export const sendQuery = async (
  threadId: number,
  query: string,
  onChunk: (chunk: string) => void
) => {
  const chatbot = await initChatbot()

  let response = ""

  const stream = await chatbot.chat_query(threadId, query)

  for await (const chunk of stream) {
    response += chunk
    onChunk(response)
  }

  await chatbot.append_response(threadId, query, response)
}