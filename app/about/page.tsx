"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function About() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-6">
      {/* Fondo */}
      <Image
        src="https://images.unsplash.com/photo-1554773228-1f38662139db?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Campo agrícola"
        fill
        quality={100}
        className="object-cover object-center brightness-70 -z-10"
      />

      {/* Tarjeta principal */}
      <Card className="relative z-10 max-w-3xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl">
        <CardContent className="p-10 space-y-6 text-center">
          <h1 className="text-3xl font-bold text-green-900">🌱 Acerca de Nosotros</h1>
          <p className="text-gray-800 text-lg leading-relaxed">
            AgroConecta es una iniciativa comunitaria para apoyar a los productores
            del corregimiento de Pantanillo. Nuestro objetivo es brindar una
            herramienta digital sencilla y accesible que facilite el registro de
            cultivos, la planificación de actividades, la capacitación en buenas
            prácticas agrícolas y la generación de reportes comunitarios.
          </p>
          <p className="text-gray-800 text-lg leading-relaxed">
            Creemos en la agricultura sostenible, en la colaboración entre familias
            campesinas y en el poder de la tecnología como apoyo al desarrollo rural.  
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
