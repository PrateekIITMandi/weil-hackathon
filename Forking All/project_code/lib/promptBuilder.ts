export type Message = {
  role: "user" | "assistant"
  content: string
}

export const buildPrompt = (messages: Message[]) => {
  let prompt = "System: You are a helpful AI assistant\n\n"

  for (const m of messages) {
    if (m.role === "user") {
      prompt += `User: ${m.content}\n`
    } else {
      prompt += `Assistant: ${m.content}\n`
    }
  }

  return prompt
}