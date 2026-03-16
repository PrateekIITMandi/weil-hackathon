"use client"

import { useState } from "react"
import { getCount, increment } from "@/services/counter"

export default function CounterPanel({
  address,
}: {
  address: string
}) {

  const [count, setCount] = useState<number | null>(null)

  const load = async () => {
    const c = await getCount(address)
    setCount(c)
  }

  const inc = async () => {
    await increment(address)
    await load()
  }

  return (
    <div className="p-4 border border-gray-700 rounded mt-4">

      <p>
        Counter Contract: {
          typeof address === "string"
            ? `${address.slice(0,8)}...`
            : "Invalid address"
        }
      </p>

      <button
        onClick={load}
        className="bg-green-600 px-3 py-1 rounded mr-2"
      >
        Get Count
      </button>

      <button
        onClick={inc}
        className="bg-blue-600 px-3 py-1 rounded"
      >
        Increment
      </button>

      {count !== null && (
        <p className="mt-3 text-lg">
          Count: {count}
        </p>
      )}

    </div>
  )
}