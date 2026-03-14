"use client"

import { useState } from "react"

export default function MessageInput({ send }: any) {
  const [text, setText] = useState("")

  return (
    <div className="flex p-4 border-t">
      <input
        className="flex-1 border p-2 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="ml-2 bg-blue-500 text-white px-4 rounded"
        onClick={() => {
          send(text)
          setText("")
        }}
      >
        Send
      </button>
    </div>
  )
}