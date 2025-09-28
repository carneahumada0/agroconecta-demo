"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import BackButton from "@/components/BackButton"
import Image from "next/image"

export default function Blog() {
  const [posts, setPosts] = useState<string[]>([])
  const [newPost, setNewPost] = useState("")

  const handleAddPost = () => {
    if (newPost.trim()) {
      setPosts([newPost, ...posts])
      setNewPost("")
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center p-6">
      {/* Fondo */}
      <Image
        src="https://images.unsplash.com/photo-1554773228-1f38662139db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Foro agrícola"
        fill
        quality={100}
        className="object-cover object-center brightness-70 -z-10"
      />

      <div className="w-full max-w-2xl space-y-6">
        <BackButton />

        <Card className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-xl">
          <CardContent className="p-6 space-y-4">
            <h1 className="text-2xl font-bold text-green-900">💬 Foro / Blog</h1>
            <p className="text-gray-700">
              Comparte tus experiencias, preguntas y consejos con la comunidad.
            </p>

            <div className="flex gap-2">
              <Input
                placeholder="Escribe un nuevo mensaje..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
              <Button onClick={handleAddPost} className="bg-green-600 text-white">
                Publicar
              </Button>
            </div>

            <div className="space-y-3 mt-4">
              {posts.map((post, i) => (
                <div
                  key={i}
                  className="p-3 bg-white/70 rounded-lg shadow-md text-gray-800"
                >
                  {post}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
