"use client"

import { useState } from "react"

export default function MessageInput({ send }: any) {

  const [text, setText] = useState("")

  const handleSend = () => {
    if (!text) return
    send(text)
    setText("")
  }

  return (
    <div className="flex border-t p-4">
      <input
        className="flex-1 p-2 bg-gray-900 border rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="ml-2 bg-blue-500 px-4 py-2 rounded"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  )
}