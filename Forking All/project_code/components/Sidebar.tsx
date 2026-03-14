"use client"

export default function Sidebar({
  threads,
  createThread,
  selectThread,
}: any) {
  return (
    <div className="w-64 bg-gray-900 p-4">
      <button
        onClick={createThread}
        className="w-full bg-teal-500 p-2 rounded"
      >
        Start new chat
      </button>

      <div className="mt-4 space-y-2">
        {threads.map((t: string, i: number) => (
          <div
            key={i}
            onClick={() => selectThread(i)}
            className="cursor-pointer bg-gray-700 p-2 rounded"
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  )
}