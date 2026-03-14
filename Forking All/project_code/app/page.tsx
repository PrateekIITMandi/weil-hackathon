"use client"

import { useState } from "react"
import Sidebar from "@/components/Sidebar"
import ChatWindow from "@/components/ChatWindow"
import MessageInput from "@/components/MessageInput"
import { createThread, sendQuery } from "@/services/chatbot"

export default function Home() {
  const [threadId, setThreadId] = useState<number | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [threads, setThreads] = useState<string[]>([])

  const newChat = async () => {
    const id = await createThread()
    setThreadId(id)
    setThreads([...threads, "New Chat"])
  }

  const sendMessage = async (query: string) => {
    if (!threadId) return

    let response = ""

    await sendQuery(threadId, query, (chunk) => {
      response = chunk
      setMessages((prev) => [...prev, { query, response }])
    })
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        threads={threads}
        createThread={newChat}
        selectThread={setThreadId}
      />

      <div className="flex flex-col flex-1">
        <ChatWindow messages={messages} />
        <MessageInput send={sendMessage} />
      </div>
    </div>
  )
}