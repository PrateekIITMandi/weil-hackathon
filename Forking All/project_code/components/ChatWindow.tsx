export default function ChatWindow({ messages }: any) {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {messages.map((m: any, i: number) => (
        <div key={i} className="mb-4">
          <div className="font-bold">You</div>
          <div>{m.query}</div>

          <div className="font-bold mt-2">AI</div>
          <div>{m.response}</div>
        </div>
      ))}
    </div>
  )
}