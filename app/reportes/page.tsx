"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function Reportes() {
  const [mensaje, setMensaje] = useState("")

  const generarReporte = (tipo: string) => {
    setMensaje(`✅ Reporte ${tipo} generado correctamente (simulado).`)
    setTimeout(() => setMensaje(""), 4000) // Limpia el mensaje después de 4s
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50 p-6">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-green-700 mb-4">📊 Reportes</h1>

          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => generarReporte("individual")}
          >
            Generar reporte individual
          </Button>

          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            onClick={() => generarReporte("comunitario")}
          >
            Generar reporte comunitario
          </Button>

          {mensaje && (
            <p className="mt-4 text-center text-green-700 font-medium">{mensaje}</p>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
