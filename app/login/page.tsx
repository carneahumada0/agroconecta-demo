"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()

  const handleLogin = () => {
    // En un sistema real, aquí validamos usuario/contraseña
    router.push("/home") // Redirige al menú principal
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-green-800 text-center mb-4">
            🔑 Ingreso a Agro-Conecta
          </h1>
          <Input placeholder="Nombre del productor" />
          <Input placeholder="Nombre de la finca" />
          <Button
            className="w-full bg-green-600 hover:bg-green-700 mt-2"
            onClick={handleLogin}
          >
            Entrar
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
