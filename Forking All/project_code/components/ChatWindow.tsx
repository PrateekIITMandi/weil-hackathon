export default function ChatWindow({ messages }: any) {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((m: any, i: number) => (
        <div key={i}>
          <div className="font-semibold">
            {m.role === "user" ? "You" : "Assistant"}
          </div>
          <div className="bg-gray-800 p-3 rounded mt-1">
            {m.content}
          </div>
        </div>
      ))}
    </div>
  )
}