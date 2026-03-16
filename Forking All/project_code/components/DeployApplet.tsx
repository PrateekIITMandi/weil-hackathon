"use client"

import { useState } from "react"
import { deployCounter } from "@/services/counter"

export default function DeployCounter({
  onDeploy,
}: {
  onDeploy: (addr: string) => void
}) {

  const [wasm, setWasm] = useState<File | null>(null)
  const [widl, setWidl] = useState<File | null>(null)

  const deploy = async () => {
    if (!wasm || !widl) {
      alert("Upload wasm and widl")
      return
    }

    try {
      const addr = await deployCounter(wasm, widl)
      onDeploy(addr)
    } catch (err) {
      console.error(err)
      alert("Deploy failed")
    }
  }

  return (
    <div className="p-4 border border-gray-700 rounded mt-4">

      <p className="text-sm mb-2">Upload Counter Contract</p>

      <input
        type="file"
        onChange={(e) => setWasm(e.target.files?.[0] || null)}
      />

      <input
        type="file"
        onChange={(e) => setWidl(e.target.files?.[0] || null)}
        className="mt-2"
      />

      <button
        onClick={deploy}
        className="bg-purple-600 px-4 py-2 rounded mt-3"
      >
        Deploy Counter
      </button>

    </div>
  )
}