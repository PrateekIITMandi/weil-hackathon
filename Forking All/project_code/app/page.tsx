"use client"

import { useState } from "react"
import ChatWindow from "@/components/ChatWindow"
import MessageInput from "@/components/MessageInput"
import { runAgentTask } from "@/services/agent"
import { buildPrompt, Message } from "@/lib/promptBuilder"

export default function Home() {

  const [messages, setMessages] = useState<Message[]>([])

  const sendMessage = async (text: string) => {

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: text }
    ]

    setMessages(newMessages)

    const prompt = buildPrompt(newMessages)

    const response = await runAgentTask(prompt)

    const updatedMessages: Message[] = [
      ...newMessages,
      { role: "assistant", content: response }
    ]

    setMessages(updatedMessages)
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <ChatWindow messages={messages} />
      <MessageInput send={sendMessage} />
    </div>
  )
}