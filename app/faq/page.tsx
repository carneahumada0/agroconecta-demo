"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import BackButton from "@/components/BackButton"
import Image from "next/image"

export default function FAQ() {
  const [faqs, setFaqs] = useState([
    { q: "¿Cómo registro un cultivo?", a: "En el menú principal selecciona 'Cultivos' y agrega la información." },
    { q: "¿La app funciona sin internet?", a: "Actualmente requiere conexión, pero se planea modo offline." }
  ])
  const [newQuestion, setNewQuestion] = useState("")

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      setFaqs([...faqs, { q: newQuestion, a: "Pendiente de respuesta..." }])
      setNewQuestion("")
    }
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center p-6">
      {/* Fondo */}
      <Image
        src="https://images.unsplash.com/photo-1554773228-1f38662139db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="FAQ agrícola"
        fill
        quality={100}
        className="object-cover object-center brightness-70 -z-10"
      />

      <div className="w-full max-w-3xl space-y-6">
        <BackButton />

        <Card className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl rounded-xl">
          <CardContent className="p-6 space-y-4">
            <h1 className="text-2xl font-bold text-green-900">❓ Preguntas Frecuentes</h1>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="p-3 bg-white/70 rounded-lg shadow-md text-left">
                  <p className="font-bold text-green-800">{faq.q}</p>
                  <p className="text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <Input
                placeholder="Escribe tu pregunta..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <Button onClick={handleAddQuestion} className="bg-green-600 text-white">
                Enviar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
