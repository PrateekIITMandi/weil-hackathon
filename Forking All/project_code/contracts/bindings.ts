import {
  WeilWallet,
  Schema,
  parseExecutionResult
} from "@weilliptic/weil-sdk"

export const Chatbot = (
  wallet: WeilWallet,
  contractAddress: string
) => ({

  list_models: async () => {

    const args = {}

    const result = await wallet.contracts.execute(
      contractAddress,
      "list_models",
      args
    )

    return parseExecutionResult(result, Schema.array(Schema.string))
  },

  new_thread: async (model: string) => {

    const args = { model }

    const result = await wallet.contracts.execute(
      contractAddress,
      "new_thread",
      args
    )

    return parseExecutionResult(result, Schema.u32)
  },

  chat_query: async (id: number, query: string) => {

    const args = {
      id,
      query_str: query
    }

    const result = await wallet.contracts.execute(
      contractAddress,
      "chat_query",
      args
    )

    return parseExecutionResult(result, Schema.string)
  },

  append_response: async (
    id: number,
    query: string,
    response: string
  ) => {

    const args = {
      id,
      query_str: query,
      answer: response,
      title: null
    }

    const result = await wallet.contracts.execute(
      contractAddress,
      "append_response",
      args
    )

    parseExecutionResult(result, Schema.void)
  }

})