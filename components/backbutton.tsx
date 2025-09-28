"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function BackButton() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-green-700 hover:text-green-900 font-medium"
    >
      <ArrowLeft size={18} />
      Atrás
    </button>
  )
}
